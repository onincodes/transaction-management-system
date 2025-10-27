import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Transaction Management System",
  description:
    "A Transaction Management System developed by Niño G. Sibua for the First Circle take-home coding test.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
