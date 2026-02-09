"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, BellOff, X } from "lucide-react"

export function PWAPushNotification() {
  const [permission, setPermission] = useState<NotificationPermission>("default")
  const [showPrompt, setShowPrompt] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if notifications are supported
    if ("Notification" in window && "serviceWorker" in navigator) {
      setIsSupported(true)
      setPermission(Notification.permission)
      
      // Show prompt if permission is default and user hasn't dismissed it
      const hasDismissed = localStorage.getItem('notification-prompt-dismissed')
      if (Notification.permission === "default" && !hasDismissed) {
        setTimeout(() => setShowPrompt(true), 10000) // Show after 10 seconds
      }
    }
  }, [])

  const requestPermission = async () => {
    if (!isSupported) return

    try {
      const permission = await Notification.requestPermission()
      setPermission(permission)
      
      if (permission === "granted") {
        // Subscribe to push notifications
        const registration = await navigator.serviceWorker.ready
        
        // Show a test notification
        registration.showNotification("Notifikasi Aktif!", {
          body: "Anda akan menerima update penting dari aplikasi ini",
          icon: "/icons/icon-192x192.svg",
          badge: "/icons/icon-96x96.svg",
          tag: "welcome-notification",
          requireInteraction: false
        })
      }
      
      setShowPrompt(false)
      localStorage.setItem('notification-prompt-dismissed', 'true')
    } catch (error) {
      console.error("Error requesting notification permission:", error)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('notification-prompt-dismissed', 'true')
  }

  if (!isSupported || !showPrompt || permission !== "default") {
    return null
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-5 max-w-md w-full mx-4">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Aktifkan Notifikasi
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Dapatkan update penting dan pemberitahuan real-time dari aplikasi
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={requestPermission}
                className="flex-1"
              >
                <Bell className="h-3 w-3 mr-1" />
                Izinkan
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
              >
                <BellOff className="h-3 w-3 mr-1" />
                Tidak
              </Button>
            </div>
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
