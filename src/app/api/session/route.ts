import { NextRequest, NextResponse } from "next/server";
import jwt from "jwt-simple";
import { getUserAccount } from "@/lib/utils";

const SECRET = process.env.JWT_SECRET|| "default_secret"; // 🛡️ Use a strong secret in production!

// POST → Create JWT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { given_name, email, user_data } = body;

    if (!given_name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      given_name,
      email,
      user_data: user_data || {},
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // ⏰ 1d expiry
    };
    const token = jwt.encode(payload, SECRET);
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error("Error creating JWT:", err);
    return NextResponse.json({ error: "Failed to create token" }, { status: 500 });
  }
}

// GET → Decode JWT
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    console.log("Received JWT:", token);


    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    // jwt.decode can throw (for example when the token is malformed or expired).
    // Catch decode-specific errors so we can return a clear 401 response instead
    // of letting an exception bubble up.
    let decoded: any;
    try {
      decoded = jwt.decode(token, SECRET);
    } catch (e: any) {
      console.error("Error decoding JWT:", e);
      const msg = e && e.message ? String(e.message) : "Invalid token";
      if (msg.toLowerCase().includes("exp") || msg.toLowerCase().includes("expired")) {
        return NextResponse.json({ error: "Token expired" }, { status: 401 });
      }
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    console.log("Decoded JWT:", decoded);

    if (decoded?.exp && decoded.exp < Date.now() / 1000) {
      return NextResponse.json({ error: "Token expired" }, { status: 401 });
    }

    const user = {given_name: decoded.given_name, email: decoded.email}

    const userData = await getUserAccount(user);
    const userFullData = await userData.json();
    const fullUser = {...user, user_data: userFullData}

    return NextResponse.json({ user: fullUser }, { status: 200 });
  } catch (err) {
    console.error("Error decoding JWT:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
