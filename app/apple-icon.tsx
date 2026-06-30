import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(120% 100% at 50% 30%, #2A1842, #0B0612)",
          color: "#E6C757",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 48 48" fill="none">
          <path
            d="M24 2c4 6 11 8 18 8 0 16-6 30-18 36C12 40 6 26 6 10c7 0 14-2 18-8Z"
            stroke="#E6C757"
            strokeWidth={2}
            fill="#E6C757"
            fillOpacity={0.12}
          />
          <path
            d="M24 12v22M16 20c4 1 4 1 8 0M16 27c4 1 4 1 8 0"
            stroke="#E6C757"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
          <circle cx="24" cy="9" r="2.2" fill="#E6C757" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
