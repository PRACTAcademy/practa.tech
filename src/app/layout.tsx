import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MITPA - MIT Preparation Academy",
    description:
        "MITPA is an open-source community platform that helps students prepare for MIT admissions through study challenges, AI-generated tests, rankings, and collaborative learning tools.",
    keywords: [
        "MITPA",
        "MIT",
        "MIT preparation",
        "MIT admissions",
        "AI study tools",
        "study challenges",
        "SAT",
        "ACT",
        "open source education",
        "student ranking",
        "STEM preparation",
        "college admissions",
    ],
    authors: [
        { name: "MITPA Team", url: "https://mitpa.tech" },
        { name: "Founder: TheusHen (MITPA)" },
    ],
    creator: "MITPA Team",
    publisher: "MITPA",
    metadataBase: new URL("https://mitpa.tech"),
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "MITPA - MIT Preparation Academy",
        description:
            "Join MITPA, a collaborative and open-source platform designed to guide students on their journey to MIT through AI-powered tools, PDF tests, rankings, and more.",
        url: "https://mitpa.tech",
        siteName: "MITPA",
        images: [
            {
                url: "https://avatars.githubusercontent.com/u/202357253",
                width: 1198,
                height: 429,
                alt: "MITPA - MIT Preparation Academy",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MITPA - MIT Preparation Alliance",
        description:
            "Prepare for MIT with AI-generated tests, user rankings, and collaborative tools. MITPA is open-source and built for future innovators.",
        site: "@MITPA_Official",
        creator: "@MITPA_Official",
        images: ["/MITPA.svg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    themeColor: "#000000",
    category: "education",
    applicationName: "MITPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
