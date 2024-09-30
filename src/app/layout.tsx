import "src/styles/globals.css";


import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Word Puzzle",
    description: "A word puzzle game for word puzzle addicts",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} w-full h-lvh bg-black`}>
            <body>{children}</body>
        </html>
    );
}
