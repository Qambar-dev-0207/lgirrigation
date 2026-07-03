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

async function seedGalleryIfNeeded(db) {
  try {
    const count = await db.collection("gallery").countDocuments();
    if (count === 0) {
      const localDataPath = path.join(process.cwd(), "src", "data", "gallery.json");
      const fileData = await fs.readFile(localDataPath, "utf8");
      const defaultItems = JSON.parse(fileData);
      
      const seededItems = defaultItems.map((item, idx) => ({
        ...item,
        order: idx
      }));
      
      await db.collection("gallery").insertMany(seededItems);
      console.log("Seeded default gallery items to MongoDB");
    }
  } catch (err) {
    console.error("Failed to seed default gallery items to MongoDB:", err);
  }
}

export async function GET() {
  try {
    const db = await getDb();
    await seedGalleryIfNeeded(db);
    
    const items = await db.collection("gallery").find().sort({ order: 1 }).toArray();
    // Strip MongoDB _id key to ensure clean API output
    const cleanItems = items.map(({ _id, ...item }) => item);
    
    return NextResponse.json(cleanItems);
  } catch (error) {
    console.error("Gallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 });
  }
}

export async function POST(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { src, alt, title, desc, tag } = body;

    if (!src || !title) {
      return NextResponse.json({ error: "Missing image path or title" }, { status: 400 });
    }

    const db = await getDb();

    // Find the highest order value to place this item at the end of the list
    const lastItem = await db.collection("gallery").find().sort({ order: -1 }).limit(1).toArray();
    const nextOrder = lastItem.length > 0 ? (lastItem[0].order || 0) + 1 : 0;

    const newItem = {
      src,
      alt: alt || title,
      title,
      desc: desc || "",
      tag: tag ? tag.toUpperCase() : "PROJECT",
      order: nextOrder
    };

    await db.collection("gallery").insertOne(newItem);
    
    const { _id, ...cleanItem } = newItem;
    return NextResponse.json(cleanItem, { status: 201 });
  } catch (error) {
    console.error("Gallery POST error:", error);
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}

export async function DELETE(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const src = searchParams.get("src");

    if (!src) {
      return NextResponse.json({ error: "Missing image source path" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("gallery").deleteOne({ src });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Gallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
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
    const bulkOps = body.map((item, index) => ({
      updateOne: {
        filter: { src: item.src },
        update: { $set: { order: index } }
      }
    }));

    await db.collection("gallery").bulkWrite(bulkOps);
    return NextResponse.json({ message: "Gallery reordered successfully" });
  } catch (error) {
    console.error("Gallery PUT error:", error);
    return NextResponse.json({ error: "Failed to update gallery order" }, { status: 500 });
  }
}
