// PWA Utility Functions

export const PWAUtils = {
  /**
   * Check if the app is running as installed PWA
   */
  isInstalled(): boolean {
    if (typeof window === 'undefined') return false
    
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes('android-app://')
    )
  },

  /**
   * Check if the app is running on iOS
   */
  isIOS(): boolean {
    if (typeof window === 'undefined') return false
    
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream
    )
  },

  /**
   * Check if the app is running on Android
   */
  isAndroid(): boolean {
    if (typeof window === 'undefined') return false
    
    return /Android/.test(navigator.userAgent)
  },

  /**
   * Check if PWA installation is supported
   */
  canInstall(): boolean {
    if (typeof window === 'undefined') return false
    
    // Check for beforeinstallprompt support (Android/Desktop)
    return 'BeforeInstallPromptEvent' in window ||
           // Or iOS with Safari
           (this.isIOS() && !this.isInstalled())
  },

  /**
   * Check if browser supports Service Workers
   */
  supportsServiceWorker(): boolean {
    return typeof window !== 'undefined' && 'serviceWorker' in navigator
  },

  /**
   * Check if browser supports Push Notifications
   */
  supportsPushNotifications(): boolean {
    return (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator &&
      'PushManager' in window
    )
  },

  /**
   * Check if browser supports Web Share API
   */
  supportsWebShare(): boolean {
    return typeof window !== 'undefined' && 'share' in navigator
  },

  /**
   * Get current display mode
   */
  getDisplayMode(): 'browser' | 'standalone' | 'fullscreen' | 'minimal-ui' {
    if (typeof window === 'undefined') return 'browser'
    
    if (window.matchMedia('(display-mode: fullscreen)').matches) {
      return 'fullscreen'
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return 'standalone'
    }
    if (window.matchMedia('(display-mode: minimal-ui)').matches) {
      return 'minimal-ui'
    }
    return 'browser'
  },

  /**
   * Get connection type and speed
   */
  getConnectionInfo(): {
    type: string
    effectiveType: string
    downlink?: number
    rtt?: number
    saveData: boolean
  } | null {
    if (typeof window === 'undefined') return null
    
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (!connection) return null
    
    return {
      type: connection.type || 'unknown',
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData || false
    }
  },

  /**
   * Check if user is online
   */
  isOnline(): boolean {
    return typeof window !== 'undefined' && navigator.onLine
  },

  /**
   * Request persistent storage
   */
  async requestPersistentStorage(): Promise<boolean> {
    if (typeof window === 'undefined' || !navigator.storage?.persist) {
      return false
    }

    try {
      const isPersisted = await navigator.storage.persist()
      return isPersisted
    } catch (error) {
      console.error('Error requesting persistent storage:', error)
      return false
    }
  },

  /**
   * Check if persistent storage is granted
   */
  async isPersistentStorageGranted(): Promise<boolean> {
    if (typeof window === 'undefined' || !navigator.storage?.persisted) {
      return false
    }

    try {
      return await navigator.storage.persisted()
    } catch (error) {
      console.error('Error checking persistent storage:', error)
      return false
    }
  },

  /**
   * Get storage estimate
   */
  async getStorageEstimate(): Promise<{
    quota?: number
    usage?: number
    usagePercent?: number
  } | null> {
    if (typeof window === 'undefined' || !navigator.storage?.estimate) {
      return null
    }

    try {
      const estimate = await navigator.storage.estimate()
      const quota = estimate.quota
      const usage = estimate.usage
      
      return {
        quota,
        usage,
        usagePercent: quota && usage ? (usage / quota) * 100 : undefined
      }
    } catch (error) {
      console.error('Error getting storage estimate:', error)
      return null
    }
  },

  /**
   * Clear all caches
   */
  async clearAllCaches(): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) {
      return
    }

    try {
      const cacheNames = await caches.keys()
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      )
      console.log('All caches cleared')
    } catch (error) {
      console.error('Error clearing caches:', error)
    }
  },

  /**
   * Unregister all service workers
   */
  async unregisterServiceWorkers(): Promise<void> {
    if (!this.supportsServiceWorker()) {
      return
    }

    try {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(
        registrations.map(registration => registration.unregister())
      )
      console.log('All service workers unregistered')
    } catch (error) {
      console.error('Error unregistering service workers:', error)
    }
  },

  /**
   * Get app installation date
   */
  getInstallDate(): Date | null {
    if (typeof window === 'undefined') return null
    
    const installTime = localStorage.getItem('pwa_install_time')
    return installTime ? new Date(parseInt(installTime, 10)) : null
  },

  /**
   * Get time since installation
   */
  getTimeSinceInstall(): number | null {
    const installDate = this.getInstallDate()
    return installDate ? Date.now() - installDate.getTime() : null
  },

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  },

  /**
   * Check PWA readiness
   */
  async checkPWAReadiness(): Promise<{
    isHTTPS: boolean
    hasManifest: boolean
    hasServiceWorker: boolean
    isInstalled: boolean
    canInstall: boolean
  }> {
    const isHTTPS = typeof window !== 'undefined' && 
                    (window.location.protocol === 'https:' || 
                     window.location.hostname === 'localhost')

    let hasManifest = false
    if (typeof document !== 'undefined') {
      hasManifest = !!document.querySelector('link[rel="manifest"]')
    }

    let hasServiceWorker = false
    if (this.supportsServiceWorker()) {
      try {
        const registration = await navigator.serviceWorker.getRegistration()
        hasServiceWorker = !!registration
      } catch (error) {
        console.error('Error checking service worker:', error)
      }
    }

    return {
      isHTTPS,
      hasManifest,
      hasServiceWorker,
      isInstalled: this.isInstalled(),
      canInstall: this.canInstall()
    }
  }
}

export default PWAUtils
