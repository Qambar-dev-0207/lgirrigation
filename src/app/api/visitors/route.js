import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const stats = await db.collection("stats").findOne({ name: "traffic" });
    return NextResponse.json({ count: stats ? stats.count : 0 });
  } catch (error) {
    console.error("Visitors GET error:", error);
    return NextResponse.json({ error: "Failed to fetch visitor count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const db = await getDb();
    const result = await db.collection("stats").findOneAndUpdate(
      { name: "traffic" },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" }
    );
    
    // Support various MongoDB driver versions compatibility
    let count = 1;
    if (result) {
      if (result.count !== undefined) {
        count = result.count;
      } else if (result.value && result.value.count !== undefined) {
        count = result.value.count;
      }
    }
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Visitors POST error:", error);
    return NextResponse.json({ error: "Failed to increment visitor count" }, { status: 500 });
  }
}
