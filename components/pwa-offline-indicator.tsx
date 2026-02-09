"use client"

import { useEffect, useState } from "react"
import { WifiOff, Wifi } from "lucide-react"

export function PWAOfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
      setShowIndicator(true)
      
      // Hide indicator after 3 seconds if online
      if (navigator.onLine) {
        setTimeout(() => setShowIndicator(false), 3000)
      }
    }

    // Initial check
    setIsOnline(navigator.onLine)

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  if (!showIndicator) {
    return null
  }

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-5 ${
      isOnline ? 'fade-out' : ''
    }`}>
      <div className={`rounded-full shadow-lg px-4 py-2 flex items-center gap-2 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-red-500 text-white'
      }`}>
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">Kembali online</span>
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            <span className="text-sm font-medium">Mode offline</span>
          </>
        )}
      </div>
    </div>
  )
}
