import type { Metadata } from "next";
import { Phudu, Poppins } from "next/font/google";
import "./globals.css";

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ruchi - Enjoy Best Food | Fast Delivery & Catering",
  description:
    "Crave it. Tap it. Eat it. Fresh flame-grilled burgers, crispy pizza, shawarma rolls, and hot meal combos delivered within 25 minutes or less. Order today!",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${phudu.variable} ${poppins.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#4D0711] text-[#FEFEF6] selection:bg-[#FD7E3B] selection:text-white">
        {children}
      </body>
    </html>
  );
}
