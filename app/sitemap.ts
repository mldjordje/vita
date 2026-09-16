import type { MetadataRoute } from "next";

export const SITE_URL = "https://www.vitaclinic.rs";

/**
 * Samo stranice koje smeju u indeks. /preview, portali i admin su demo i nose noindex —
 * da su ovde, Search Console bi ih prijavio kao „poslato, ali blokirano".
 * Kad pravi sajt zameni coming soon, ovde se dodaju tim i profili lekara.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
