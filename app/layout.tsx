import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DROOM",
  description: "A video calling feature",
  icons:{
    icon:'/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en">
      <ClerkProvider
        appearance={{
          layout :{
            logoImageUrl: "/droom-logo.svg",
            socialButtonsVariant:"iconButton",
            
          },
          variables: {
            colorPrimary: "#0E78F9",
            colorText: "#fff",
            colorBackground: "#1C1F2E",
            colorInputBackground: "#252A41",
            colorInputText: "#fff",
          },
        }}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased secondary-bg`}>
          {children}
            <Toaster position="top-right"  />
        </body>
      </ClerkProvider>
    </html>
  );
}
