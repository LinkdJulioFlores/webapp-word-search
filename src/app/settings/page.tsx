'use client'

import ThemeContext from "src/styles/theme-context";

function SettingsPage() {
    return (
        <main className="flex flex-col w-full items-center">
            <div id="outlined-card" className="w-3/5 p-2 rounded-lg flex flex-col gap-2">
                <h1 className="font-bold">App Settings</h1>
                <div className="w-full flex flex-col"> {/* Color Theme */}
                    <h2 className="border-b-black w-full">App Theme</h2>
                    <div className="theme-options">
                        <div className="flex flex-col items-center">
                            Light
                            <ThemeContext theme="light"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Dark
                            <ThemeContext theme="dark"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Halloween
                            <ThemeContext theme="halloween"/>
                        </div>
                        <div className="flex flex-col items-center">
                            Purple 
                            <ThemeContext theme="purple"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SettingsPage;
