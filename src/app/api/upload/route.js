import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

function verifyAuth(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;
  
  const adminEmail = process.env.ADMIN_EMAIL || "lgirrigationadmin@gmail.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "!LGadmin!!";
  
  const token = authHeader.replace("Basic ", "").trim();
  const expected = Buffer.from(`${adminEmail}:${adminPassword}`).toString("base64");
  return token === expected;
}

export async function POST(req) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate safe, clean filename
    const originalName = file.name || "upload";
    const fileExt = path.extname(originalName) || ".png";
    const baseName = path.basename(originalName, fileExt).replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${Date.now()}_${baseName}${fileExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the relative URL of the uploaded image
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process and upload file" }, { status: 500 });
  }
}
