import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'FreeMD2PDF – Convert Markdown to PDF Instantly',
          description: 'A free, open-source tool to convert Markdown text into beautiful PDFs with one click.',
          image: 'https://raw.githubusercontent.com/HichemTab-tech/FreeMD2PDF/master/public/cover.png',
          url: 'https://free-md-2-pdf.vercel.app',
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
