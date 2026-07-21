import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.meta.title;

const LINE = "rgba(143, 217, 251, 0.14)";

export default async function OgImage() {
  const [bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Bold.ttf")),
    readFile(join(process.cwd(), "assets/fonts/JetBrainsMono-Regular.ttf")),
  ]);

  const verticals = Array.from({ length: 17 }, (_, i) => i * 75);
  const horizontals = Array.from({ length: 9 }, (_, i) => i * 78.75);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#05080b",
          fontFamily: "JetBrains Mono",
          position: "relative",
        }}
      >
        {verticals.map((x) => (
          <div
            key={`v${x}`}
            style={{
              position: "absolute",
              left: x,
              top: 0,
              width: 1,
              height: "100%",
              background: LINE,
            }}
          />
        ))}
        {horizontals.map((y) => (
          <div
            key={`h${y}`}
            style={{
              position: "absolute",
              top: y,
              left: 0,
              height: 1,
              width: "100%",
              background: LINE,
            }}
          />
        ))}
        {/* horizon line */}
        <div
          style={{
            position: "absolute",
            top: 472,
            left: 0,
            height: 2,
            width: "100%",
            background: "rgba(189, 232, 255, 0.55)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 96,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 400,
              letterSpacing: "0.26em",
              color: "rgba(143, 217, 251, 0.8)",
              marginBottom: 28,
            }}
          >
            software developer
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              color: "#eef6fb",
              display: "flex",
              alignItems: "center",
            }}
          >
            haitam oudah
            <div
              style={{
                width: 50,
                height: 88,
                background: "#8fd9fb",
                marginLeft: 18,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "rgba(143, 217, 251, 0.6)",
              marginTop: 44,
            }}
          >
            haitamoudah.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: bold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
      ],
    },
  );
}
