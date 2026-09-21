export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://landing-nimbus.vercel.app/sitemap.xml",
    host: "https://landing-nimbus.vercel.app",
  };
}
