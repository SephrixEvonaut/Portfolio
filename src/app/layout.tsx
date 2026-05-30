import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tyler McRae — Portfolio",
  description:
    "Full-stack engineer specializing in real-time systems, AI integrations, and developer tooling. TypeScript and Node.js end to end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased scroll-smooth dark`}>
      <body
        className="min-h-full flex flex-col font-sans text-neutral-100"
        style={{
          backgroundImage: "url('/site-bg.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          backgroundColor: "#080b10",
        }}
      >
        {children}
      </body>
    </html>
  );
}
