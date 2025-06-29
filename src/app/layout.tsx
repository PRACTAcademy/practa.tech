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
    title: "PRACTA | Preparation Academy for College & Tech Admissions",
    description:
        "PRACTA is an open-source community platform that helps students prepare for MIT admissions through study challenges, AI-generated tests, rankings, and collaborative learning tools.",
    keywords: [
        "PRACTA",
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
        { name: "PRACTA Team", url: "https://PRACTA.tech" },
        { name: "Founder: TheusHen (PRACTA)" },
    ],
    creator: "PRACTA Team",
    publisher: "PRACTA",
    metadataBase: new URL("https://practa.tech"),
    icons: {
        icon: "/favicon.ico",
    },
    openGraph: {
        title: "PRACTA - Preparation Academy for College & Tech Admissions",
        description:
            "Join PRACTA, a collaborative and open-source platform designed to guide students on their journey to MIT through AI-powered tools, PDF exams, rankings, and more.",
        url: "https://practa.tech",
        siteName: "PRACTA",
        images: [
            {
                url: "https://avatars.githubusercontent.com/u/202357253",
                width: 1198,
                height: 429,
                alt: "PRACTA - Preparation Academy for College & Tech Admissions",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "PRACTA - Preparation Academy for College & Tech Admissions",
        description:
            "Prepare for MIT and others with AI-generated tests, user rankings, and collaborative tools. PRACTA is open-source and built for future innovators.",
        site: "@PRACTATech",
        creator: "@PRACTATech",
        images: ["/PRACTA.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
    },
    themeColor: "#000000",
    category: "education",
    applicationName: "PRACTA",
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
