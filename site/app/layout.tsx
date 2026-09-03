import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solo Attorney Claude Starter Kit — Free Claude Desktop Plugin",
  description:
    "6 pre-built Claude Desktop skills for solo attorneys. Organize matters, draft engagement letters, compute court deadlines, prep for meetings, and write billing narratives in under 5 minutes. Free download.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Cloudflare Web Analytics — replace token before deploying */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_CF_ANALYTICS_TOKEN"}'
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
