import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b080c",
          backgroundImage:
            "radial-gradient(900px circle at 50% -20%, rgba(168,124,255,0.28), transparent 60%)",
          padding: "72px",
          color: "#eae5ec",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid #2a2232",
              background: "#120e16",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c2a4ff",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            NS
          </div>
          <div style={{ fontSize: 26, color: "#9c92a8" }}>{site.githubUser}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              color: "#c2a4ff",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 99, background: "#c2a4ff" }} />
            {site.availability}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            <span>{site.name} — </span>
            <span style={{ color: "#c2a4ff" }}>{site.role}</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9c92a8", maxWidth: 1000 }}>
            {`${site.headline} ${site.tagline}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, fontSize: 22, color: "#9c92a8" }}>
          <span>Rust</span> · <span>Next.js</span> · <span>AI</span> · <span>Open Source</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
