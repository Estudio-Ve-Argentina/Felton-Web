import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const CLIENT_ID = process.env.TIENDANUBE_CLIENT_ID;
  const CLIENT_SECRET = process.env.TIENDANUBE_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing TIENDANUBE_CLIENT_ID or TIENDANUBE_CLIENT_SECRET" }, { status: 500 });
  }

  try {
    const response = await fetch("https://www.tiendanube.com/apps/authorize/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    
    // In a real application, you'd save data.access_token and data.user_id to a database.
    // For this starter, we display it so the user can copy it to .env.local.
    return new NextResponse(
      `<html>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f0fdf4;">
          <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
            <h1 style="color: #166534; margin-top: 0;">Authorization Successful!</h1>
            <p>Copy these values to your <code>.env.local</code> file:</p>
            <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
              <p><strong>TIENDANUBE_ACCESS_TOKEN:</strong> <br/><code style="word-break: break-all;">${data.access_token}</code></p>
              <p><strong>TIENDANUBE_STORE_ID:</strong> <br/><code>${data.user_id}</code></p>
            </div>
            <p style="color: #64748b; font-size: 0.875rem;">After updating .env.local, restart your dev server if necessary.</p>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
