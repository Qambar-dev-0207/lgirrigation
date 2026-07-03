import { NextResponse } from "next/server";

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
  try {
    // If authorization header is provided, verify it directly (auto-login check)
    const authHeader = req.headers.get("authorization");
    if (authHeader) {
      if (verifyAuth(req)) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
      }
    }

    // Otherwise, perform email & password check
    const body = await req.json();
    const { email, password } = body;

    const adminEmail = process.env.ADMIN_EMAIL || "lgirrigationadmin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "!LGadmin!!";

    if (email === adminEmail && password === adminPassword) {
      const token = Buffer.from(`${email}:${password}`).toString("base64");
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
