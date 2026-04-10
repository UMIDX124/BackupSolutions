import { NextResponse } from "next/server";

const INDEXNOW_KEY = "backup-solutions-indexnow-key-2025";
const HOST = "backupsolutions.com";

export async function POST(request: Request) {
  try {
    const { urls } = await request.json();

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "urls array required" }, { status: 400 });
    }

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/indexnow-key.txt`,
        urlList: urls.map((u: string) => `https://${HOST}${u}`),
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
    });
  } catch (error) {
    console.error("IndexNow error:", error);
    return NextResponse.json({ error: "Failed to submit URLs" }, { status: 500 });
  }
}
