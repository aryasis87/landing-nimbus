import { INSIDEN, SITE } from "@/lib/nimbus";

export default function sitemap() {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/harga`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/status`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    ...INSIDEN.map((i) => ({ url: `${SITE}/insiden/${i.slug}`, lastModified: now, changeFrequency: "yearly", priority: 0.5 })),
  ];
}
