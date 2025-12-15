import type { Metadata } from "next";
import { Lato, Inter, Poppins, Work_Sans, Epilogue, DM_Sans } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-lato",
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-work-sans",
});

const epilogue = Epilogue({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-epilogue",
});

const dmSans = DM_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Brewly Dashboard",
  description: "In-Store Operations Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${inter.variable} ${poppins.variable} ${workSans.variable} ${epilogue.variable} ${dmSans.variable} antialiased font-lato`}>
        {children}
      </body>
    </html>
  );
}
