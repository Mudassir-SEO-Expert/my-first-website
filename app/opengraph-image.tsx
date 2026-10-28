import { ImageResponse } from "next/og";
export const alt = "Nexovate — Build smarter. Launch stronger. Grow further.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "70px",
        background: "linear-gradient(120deg,#061438,#291752)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, letterSpacing: 4 }}>
        NEXOVATE ↗
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        <span>Build smarter.</span>
        <span>Launch stronger.</span>
        <span style={{ color: "#b99aff" }}>Grow further.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20, color: "#c9d3ed" }}>
        Development × Design × Digital growth
      </div>
    </div>,
    size,
  );
}
