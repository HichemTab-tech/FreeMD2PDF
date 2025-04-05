import {createContext} from "react";

interface ThemeContextProps {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    setTheme: () => {},
})

export default ThemeContext