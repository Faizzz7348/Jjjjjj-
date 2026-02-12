"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after user has been on site for 30 seconds
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed')
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true)
      setShowPrompt(false)
      localStorage.removeItem('pwa-prompt-dismissed')
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowPrompt(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  if (isInstalled || !showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom duration-500 md:left-auto md:right-4 md:max-w-sm">
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-xl shadow-2xl p-4 border border-primary/20">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="pr-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              📱
            </div>
            <div>
              <h3 className="font-bold text-base">Install VMRF App</h3>
              <p className="text-xs opacity-90">Add to home screen for quick access</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4 text-xs opacity-90">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Faster loading</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Native app experience</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold"
            >
              Install Now
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="hover:bg-white/20 text-white"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
