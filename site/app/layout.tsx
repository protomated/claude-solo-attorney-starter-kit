import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solo Attorney Claude Starter Kit — Free Claude Desktop Plugin",
  description:
    "8 pre-built Claude Desktop skills for solo attorneys. Organize matters, draft engagement letters, compute court deadlines, prep for meetings, write billing narratives, model flat-fee repricing, and draft verified-source research memos in under 5 minutes. Free download.",
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
