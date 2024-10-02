import "src/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TopNav } from "src/components/topnav";
import PlayerProvider from "src/api/player-context";

export const metadata: Metadata = {
    title: "Word Puzzle",
    description: "A word puzzle game for word puzzle addicts",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body data-theme="light" className="flex flex-col gap-3">
                <TopNav/>
                <PlayerProvider>
                    {children}
                </PlayerProvider>
            </body>
        </html>
    );
}
