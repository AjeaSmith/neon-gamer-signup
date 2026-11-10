import type { Metadata } from "next";
import { JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Core",
  description: "A sign up for a gaming community",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${jetBrainsMono.variable} bg-app-neutral-950  antialiased lg:bg-[url('/images/pattern-backdrop.svg')] lg:bg-contain lg:bg-position-[right_-16.6rem_center] lg:bg-no-repeat`}
    >
      <body>{children}</body>
    </html>
  );
}
