import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getDb } from "@/lib/mongodb";

function verifyAuth(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;
  
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminEmail || !adminPassword) {
    console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment!");
    return false;
  }
  
  const token = authHeader.replace("Basic ", "").trim();
  const expected = Buffer.from(`${adminEmail}:${adminPassword}`).toString("base64");
  return token === expected;
}

async function seedProductsIfNeeded(db) {
  try {
    const count = await db.collection("products").countDocuments();
    if (count === 0) {
      const localDataPath = path.join(process.cwd(), "src", "data", "products.json");
      const fileData = await fs.readFile(localDataPath, "utf8");
      const defaultProducts = JSON.parse(fileData);
      
      const seededProducts = defaultProducts.map((p, idx) => ({
        ...p,
        order: idx
      }));
      
      await db.collection("products").insertMany(seededProducts);
      console.log("Seeded default products to MongoDB");
    }
  } catch (err) {
    console.error("Failed to seed default products to MongoDB:", err);
  }
}

export async function GET() {
  try {
    const db = await getDb();
    await seedProductsIfNeeded(db);
    
    const products = await db.collection("products").find().sort({ order: 1 }).toArray();
    // Strip MongoDB _id key to ensure clean API output
    const cleanProducts = products.map(({ _id, ...p }) => p);
    
    return NextResponse.json(cleanProducts);
  } catch (error) {
    console.error("Products GET error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      standard,
      eyebrow,
      shortDescription,
      longDescription,
      image,
      rangeSummary,
      pressureSummary,
      tags,
      featuresTitle,
      features,
      rangeDetails,
      specTable,
      accessories
    } = body;

    if (!title || !shortDescription) {
      return NextResponse.json({ error: "Missing title or short description" }, { status: 400 });
    }

    const db = await getDb();
    
    // Find the highest order value to place this product at the end of the list
    const lastProduct = await db.collection("products").find().sort({ order: -1 }).limit(1).toArray();
    const nextOrder = lastProduct.length > 0 ? (lastProduct[0].order || 0) + 1 : 0;

    // Generate safe unique ID from title
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();

    const newProduct = {
      id,
      title,
      standard: standard || "",
      eyebrow: eyebrow || "",
      shortDescription,
      longDescription: longDescription || shortDescription,
      image: image || "/placeholder.png",
      rangeSummary: rangeSummary || "",
      pressureSummary: pressureSummary || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim().toUpperCase()) : []),
      featuresTitle: featuresTitle || "Applications & Features:",
      features: Array.isArray(features) ? features : (features ? features.split("\n").map(f => f.trim()).filter(Boolean) : []),
      rangeDetails: rangeDetails || "",
      specTable: specTable || null,
      accessories: Array.isArray(accessories) ? accessories : (accessories ? accessories.split("\n").map(a => a.trim()).filter(Boolean) : null),
      order: nextOrder
    };

    await db.collection("products").insertOne(newProduct);
    
    const { _id, ...cleanProduct } = newProduct;
    return NextResponse.json(cleanProduct, { status: 201 });
  } catch (error) {
    console.error("Products POST error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("products").deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Products DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}

export async function PUT(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const db = await getDb();
    
    // Prepare bulk write operations to update order indexes
    const bulkOps = body.map((product, index) => ({
      updateOne: {
        filter: { id: product.id },
        update: { $set: { order: index } }
      }
    }));

    await db.collection("products").bulkWrite(bulkOps);
    return NextResponse.json({ message: "Products reordered successfully" });
  } catch (error) {
    console.error("Products PUT error:", error);
    return NextResponse.json({ error: "Failed to update product order" }, { status: 500 });
  }
}
