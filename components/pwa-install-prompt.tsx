"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if already installed (standalone mode)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')
    
    setIsStandalone(isInStandaloneMode)

    // Check if user already dismissed the prompt
    const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed')
    
    if (!isInStandaloneMode && !hasSeenPrompt) {
      // For Android/Desktop - listen for beforeinstallprompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault()
        setDeferredPrompt(e as BeforeInstallPromptEvent)
        setTimeout(() => setShowPrompt(true), 3000) // Show after 3 seconds
      }

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      // For iOS - show custom prompt after delay
      if (isIOSDevice && !hasSeenPrompt) {
        setTimeout(() => setShowPrompt(true), 5000) // Show after 5 seconds
      }

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
    localStorage.setItem('pwa-install-prompt-dismissed', 'true')
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-install-prompt-dismissed', 'true')
  }

  if (!showPrompt || isStandalone) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-background border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Smartphone className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Install Aplikasi
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              {isIOS ? (
                <>
                  Install aplikasi ini di iPhone Anda: tap{" "}
                  <span className="inline-block">
                    <svg className="inline h-4 w-4" fill="currentColor" viewBox="0 0 50 50">
                      <path d="M 25 2 C 23.34375 2 22 3.34375 22 5 L 22 24.09375 L 16.71875 18.71875 C 15.921875 17.921875 14.632813 17.921875 13.84375 18.71875 C 13.046875 19.515625 13.046875 20.804688 13.84375 21.59375 L 23.59375 31.34375 C 24.390625 32.140625 25.609375 32.140625 26.40625 31.34375 L 36.15625 21.59375 C 36.953125 20.796875 36.953125 19.507813 36.15625 18.71875 C 35.359375 17.921875 34.070313 17.921875 33.28125 18.71875 L 28 24.09375 L 28 5 C 28 3.34375 26.65625 2 25 2 Z M 9 36 C 7.34375 36 6 37.34375 6 39 L 6 43 C 6 45.75 8.25 48 11 48 L 39 48 C 41.75 48 44 45.75 44 43 L 44 39 C 44 37.34375 42.65625 36 41 36 C 39.34375 36 38 37.34375 38 39 L 38 42 L 12 42 L 12 39 C 12 37.34375 10.65625 36 9 36 Z"/>
                    </svg>
                  </span>{" "}
                  lalu &quot;Add to Home Screen&quot;
                </>
              ) : (
                "Tambahkan aplikasi ini ke home screen untuk akses cepat dan pengalaman yang lebih baik"
              )}
            </p>
            {!isIOS && deferredPrompt && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleInstall}
                  className="flex-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDismiss}
                >
                  Nanti
                </Button>
              </div>
            )}
            {isIOS && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="w-full"
              >
                Mengerti
              </Button>
            )}
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
