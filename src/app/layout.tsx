import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CUT AND SEWN BLANKS — blankhaus",
  description:
    "Premium cut and sewn t-shirt blanks. Made in Los Angeles. In-person consultation in Austin, TX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise antialiased">
        {children}
      </body>
    </html>
  );
}
