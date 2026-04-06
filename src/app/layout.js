import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://codesprint.co.za"),
  title: {
    default: "CodeSprint | Professional Websites in 24 Hours",
    template: "%s | CodeSprint",
  },
  description:
    "Professional custom business websites delivered in 24 hours. Design, branding, code, 1 year support and live progress tracking.",
  keywords: [
    "web design South Africa",
    "website development Pretoria",
    "24 hour website",
    "small business websites",
    "landing pages",
  ],
  openGraph: {
    title: "CodeSprint",
    description: "Your custom business website live in 24 hours.",
    url: "https://codesprint.co.za",
    siteName: "CodeSprint",
    images: ["/logo.png"],
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
