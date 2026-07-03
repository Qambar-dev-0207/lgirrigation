import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

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
    
    const mimeType = file.type || "image/png";
    const base64String = buffer.toString("base64");
    const dataUri = `data:${mimeType};base64,${base64String}`;

    // Return the self-contained base64 data URI of the uploaded image
    return NextResponse.json({ url: dataUri });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process image file" }, { status: 500 });
  }
}
