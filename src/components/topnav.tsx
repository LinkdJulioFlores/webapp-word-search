import Link from "next/link";

export function TopNav() {
    return (
        <nav id="topnav-container" className="flex flex-row w-full h-12 items-center justify-between">
            <div> {/* This is the logo */}
                <li><a><div className="w-6 h-6 rounded-full bg-blue-600 ml-4"></div></a></li>
            </div>

            <div className="flex flex-row text-lg gap-3"> {/* This is the nav Links */}
                <li><a><Link href="/">Home</Link></a></li>
                <li><a><Link href={"/games"}>Games</Link></a></li>
                <li><a><Link href="/settings">Settings</Link></a></li>
            </div>

            <button className="mr-4 py-1 px-2 rounded-lg"> {/* This is the login button */}
                <li><a className="font-semibold">Login</a></li>
            </button>
        </nav>
    );
}

