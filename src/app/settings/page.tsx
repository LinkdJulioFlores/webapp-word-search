import ThemeContext from "src/styles/theme-context";

function SettingsPage() {
    return (
        <main className="flex flex-col w-full items-center">
            <div id="outlined-card" className="w-3/5 p-2 rounded-lg flex flex-col gap-2">
                <h1 className="font-bold">App Settings</h1>
                <div className="w-full flex flex-col"> {/* Color Theme */}
                    <h2>App Theme</h2>
                    <div className="theme-options">
                        <ThemeContext theme="light"/>
                        <ThemeContext theme="halloween"/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SettingsPage;
