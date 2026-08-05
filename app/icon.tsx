import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram V u vinskoj boji — privremeni znak dok ne stigne logo u vektoru. */
export default async function Icon() {
  const display = await readFile(join(process.cwd(), "app/_og/BodoniModa-500.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#5a1130",
          color: "#f7dce6",
          fontFamily: "Bodoni",
          fontSize: 44,
          lineHeight: 1,
          paddingBottom: 4,
        }}
      >
        V
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Bodoni", data: display, style: "normal", weight: 500 }],
    }
  );
}
