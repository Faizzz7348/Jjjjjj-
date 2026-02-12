import type { Metadata, Viewport } from "next"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import { LanguageProvider } from "@/contexts/language-context"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

export const metadata: Metadata = {
  title: {
    default: "Route Manager",
    template: "%s | Route Manager"
  },
  description: "Aplikasi manajemen route delivery dengan QR code scanner dan real-time tracking untuk Kuala Lumpur dan Selangor",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VMRF Route Manager"
  },
  formatDetection: {
    telephone: false
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* PWA Meta Tags */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VMRF" />
        
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
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <ToastProvider>
            {children}
            <PWAInstallPrompt />
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
