import type { Metadata, Viewport } from "next"
import "./globals.css"
import { NavigationProgress } from "@/components/navigation-progress"
import { ToastProvider } from "@/components/ui/toast"
import { LanguageProvider } from "@/contexts/language-context"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { PWAUpdatePrompt } from "@/components/pwa-update-prompt"
import { PWAPushNotification } from "@/components/pwa-push-notification"
import { PWAOfflineIndicator } from "@/components/pwa-offline-indicator"

export const metadata: Metadata = {
  title: {
    default: "Route Manager",
    template: "%s | Route Manager"
  },
  description: "Aplikasi manajemen route delivery dengan fitur offline, QR code scanner, dan real-time tracking untuk Kuala Lumpur dan Selangor",
  keywords: ["Route Manager", "Delivery", "Route Planning", "QR Scanner", "Offline App", "PWA"],
  authors: [{ name: "Route Manager Team" }],
  creator: "Route Manager Team",
  publisher: "Route Manager Team",
  applicationName: "Route Manager",
  generator: "Next.js",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Route Manager",
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
    siteName: "Route Manager",
    title: {
      default: "Route Manager",
      template: "%s | Route Manager"
    },
    description: "Aplikasi manajemen route delivery dengan fitur offline, QR code scanner, dan real-time tracking",
    images: [
      {
        url: "/icons/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "Route Manager"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Route Manager",
      template: "%s | Route Manager"
    },
    description: "Aplikasi manajemen route delivery dengan fitur offline dan QR scanner",
    images: ["/icons/icon-512x512.png"],
    creator: "@routemanager"
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
            {children}
          </ToastProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
