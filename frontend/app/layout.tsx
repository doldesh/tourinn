import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

const interSans = Inter({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Tourinn",
  description: "Tourinn makes it easy to explore the world your way. Find and book top-rated tours, local experiences, and adventure packages from verified operators. Whether you’re planning a weekend getaway or a full vacation, Tourinn helps you travel smarter and discover more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${playfairDisplay.variable} antialiased`}>
        <ResponsiveNav />
        {children}
      </body>
    </html>
  );
}
