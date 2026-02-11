import type { Metadata } from "next"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: {
    default: "Route Manager",
    template: "%s | Route Manager"
  },
  description: "Aplikasi manajemen route delivery dengan QR code scanner dan real-time tracking untuk Kuala Lumpur dan Selangor"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) {
                    theme = 'dark';
                    localStorage.setItem('theme', theme);
                  }
                  document.documentElement.classList.add(theme);
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
