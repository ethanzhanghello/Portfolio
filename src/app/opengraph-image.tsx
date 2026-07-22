import { ImageResponse } from "next/og";
import { site } from "@/data/content";

/**
 * Open Graph / Twitter card image, generated at build time - no binary
 * asset to keep in the repo.
 */

export const alt = `${site.name} - Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0f14",
          color: "#e7edf2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            color: "#2dd4bf",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#2dd4bf",
            }}
          />
          {site.status}
        </div>
        <div style={{ marginTop: 36, fontSize: 96, fontWeight: 700 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 38, color: "#93a1ae" }}>{site.headline}</div>
        <div
          style={{
            marginTop: 48,
            width: 120,
            height: 8,
            backgroundColor: "#2dd4bf",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    size,
  );
}
