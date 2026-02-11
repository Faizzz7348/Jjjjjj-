"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function PWAUpdatePrompt() {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('✅ Service Worker registered successfully:', registration.scope)
          
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            console.log('🔄 Service Worker: Update found')

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                console.log('Service Worker state:', newWorker.state)
                
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('✨ Service Worker: New version available')
                  setShowReload(true)
                  setWaitingWorker(newWorker)
                }
              })
            }
          })
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error)
        })

      // Listen for controller change and reload page
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        console.log('🔄 Service Worker: Controller changed, reloading page')
        refreshing = true
        window.location.reload()
      })
    } else {
      console.log('⚠️  Service Worker not supported in this browser')
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' })
      setShowReload(false)
    }
  }

  if (!showReload) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-5">
      <div className="bg-primary text-primary-foreground rounded-lg shadow-lg p-4 flex items-center gap-3">
        <RefreshCw className="h-5 w-5" />
        <p className="text-sm font-medium">
          Update tersedia!
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleUpdate}
          className="ml-2"
        >
          Refresh
        </Button>
      </div>
    </div>
  )
}
