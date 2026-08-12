import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { Navbar } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FixItNow - Home Services at Your Doorstep",
  description:
    "FixItNow is a modern home service platform that connects customers with trusted professionals for plumbing, cleaning, repairs, and other essential home services.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getMe();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        <TooltipProvider>
          <main>{children}</main>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
