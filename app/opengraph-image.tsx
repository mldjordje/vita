import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { clinic, hero } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${clinic.name} ${clinic.city} — ${clinic.tagline}`;

/**
 * Link se deli preko WhatsApp-a i Viber-a, gde je pregled prva stvar koju klijent vidi.
 * Font se učitava iz repoa, ne sa Google-a, da render ne zavisi od mreže.
 */
export default async function Image() {
  const display = await readFile(join(process.cwd(), "app/_og/BodoniModa-500.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#5a1130",
          padding: "72px 80px",
          color: "#f8f6f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 1, background: "#c9a96a" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#f7dce6",
            }}
          >
            {`${clinic.city} · Ginekologija i akušerstvo`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Bodoni", fontSize: 132, lineHeight: 1 }}>
            {clinic.name}
          </div>
          <div
            style={{
              fontFamily: "Bodoni",
              fontSize: 54,
              lineHeight: 1.1,
              marginTop: 12,
              color: "#f7dce6",
            }}
          >
            {hero.title.join(" ")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "rgba(248,246,244,0.62)",
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>{clinic.address}</span>
            <span>{clinic.phone}</span>
          </div>
          <div style={{ fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
            Demo prikaz
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bodoni", data: display, style: "normal", weight: 500 }],
    }
  );
}
