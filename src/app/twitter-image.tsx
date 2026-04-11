import { ImageResponse } from "next/og";

export const alt = "Backup Solutions — Enterprise Technology That Never Fails";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#0D0D0D", fontFamily: "system-ui, sans-serif", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #D4A853, #B8860B, #D4A853)" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", borderRadius: "16px", background: "linear-gradient(135deg, #D4A853, #B8860B)", marginBottom: "32px", fontSize: "36px", fontWeight: 800, color: "#0D0D0D" }}>BS</div>
        <div style={{ fontSize: "56px", fontWeight: 800, color: "#FAF8F5", letterSpacing: "-1px", marginBottom: "16px" }}>Backup Solutions</div>
        <div style={{ fontSize: "24px", color: "#A39E96", maxWidth: "700px", textAlign: "center", lineHeight: 1.4 }}>Enterprise Technology That Never Fails</div>
        <div style={{ position: "absolute", bottom: "32px", fontSize: "16px", color: "#D4A853", letterSpacing: "2px", textTransform: "uppercase" }}>backupsolutions.com</div>
      </div>
    ),
    { ...size }
  );
}
