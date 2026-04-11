import { ImageResponse } from "next/og";
import { portfolioData } from "@/lib/data";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
          padding: "64px",
          color: "#121212",
        }}
      >
        <div style={{ fontSize: 36, opacity: 0.7 }}>Portfolio</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 76, fontWeight: 700 }}>{portfolioData.personal.name}</div>
          <div style={{ fontSize: 40, opacity: 0.8 }}>{portfolioData.personal.role}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
