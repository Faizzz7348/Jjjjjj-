import type { Metadata, Viewport } from "next"
import "./globals.css"
import { NavigationProgress } from "@/components/navigation-progress"
import { ToastProvider } from "@/components/ui/toast"
import { LanguageProvider } from "@/contexts/language-context"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWAUpdatePrompt } from "@/components/pwa-update-prompt"
import { PWAPushNotification } from "@/components/pwa-push-notification"
import { PWAOfflineIndicator } from "@/components/pwa-offline-indicator"
import { PWADebugPanel } from "@/components/pwa-debug-panel"

export const metadata: Metadata = {
  title: {
    default: "My Awesome PWA",
    template: "%s | My Awesome PWA"
  },
  description: "Progressive Web App paling terhebat dengan fitur lengkap - offline support, installable, push notifications",
  keywords: ["PWA", "Progressive Web App", "Offline", "Mobile App", "Web App"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  publisher: "Your Name",
  applicationName: "My Awesome PWA",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Awesome PWA",
    startupImage: [
      {
        url: "/icons/icon-512x512.png",
        media: "(device-width: 768px) and (device-height: 1024px)"
      }
    ]
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  openGraph: {
    type: "website",
    siteName: "My Awesome PWA",
    title: {
      default: "My Awesome PWA",
      template: "%s | My Awesome PWA"
    },
    description: "Progressive Web App paling terhebat dengan fitur lengkap",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "My Awesome PWA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "My Awesome PWA",
      template: "%s | My Awesome PWA"
    },
    description: "Progressive Web App paling terhebat dengan fitur lengkap",
    images: ["/icons/icon-512x512.png"],
    creator: "@yourusername"
  },
  icons: {
    icon: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/icon-152x152.png"
      }
    ]
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
        <meta name="application-name" content="My Awesome PWA" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Awesome PWA" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/icon-96x96.png" />
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
            <PWAOfflineIndicator />
            <PWAUpdatePrompt />
            <PWAInstallPrompt />
            <PWAPushNotification />
            <PWADebugPanel />
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
