'use client'
type ThemeContextProps = {
    theme: string;
};

const ThemeContext = ({theme}: ThemeContextProps) => {
    const setTheme = () => {
        document.querySelector('body')?.setAttribute('data-theme', theme);
    }

    return(<div onClick={setTheme} className="theme-option" id={`theme-${theme}`}> </div>);
}

export default ThemeContext;
