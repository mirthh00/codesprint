export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/track/"],
    },
    sitemap: "https://codesprint.co.za/sitemap.xml",
  };
}