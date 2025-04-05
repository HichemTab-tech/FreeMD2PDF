import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Toaster} from "@/components/ui/sonner.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

createRoot(document.getElementById('root')!).render(
    <>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <App/>
            <Toaster/>
        </ThemeProvider>
    </>
)
