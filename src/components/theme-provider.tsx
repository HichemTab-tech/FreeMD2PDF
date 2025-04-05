import { useState, useEffect } from "react"
import ThemeContext from "@/context/ThemeContext.ts";
import * as React from "react";

interface ThemeProviderProps {
    defaultTheme?: string
    children: React.ReactNode
    attribute?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            setTheme(storedTheme)
        } else {
            setTheme(props.defaultTheme || "system")
        }
    }, [props.defaultTheme])

    useEffect(() => {
        if (theme === "system") {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            document.documentElement.classList.toggle("dark", isDark)
        } else if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)
    }, [theme])

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

