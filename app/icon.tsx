import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/* the blinking block cursor from the hero, frozen */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05080b",
        }}
      >
        <div style={{ width: 12, height: 20, background: "#8fd9fb" }} />
      </div>
    ),
    size,
  );
}
