// PWA Analytics & Performance Tracking

export class PWAAnalytics {
  private static instance: PWAAnalytics
  private isStandalone: boolean = false
  private installTime: number | null = null

  private constructor() {
    this.detectInstallation()
    this.trackPerformance()
  }

  public static getInstance(): PWAAnalytics {
    if (!PWAAnalytics.instance) {
      PWAAnalytics.instance = new PWAAnalytics()
    }
    return PWAAnalytics.instance
  }

  private detectInstallation() {
    // Check if app is installed (standalone mode)
    this.isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://')

    if (this.isStandalone) {
      this.trackEvent('pwa_launched', { mode: 'standalone' })
    }

    // Track installation
    window.addEventListener('appinstalled', (e) => {
      this.installTime = Date.now()
      this.trackEvent('pwa_installed', {
        timestamp: this.installTime,
        userAgent: navigator.userAgent
      })
      localStorage.setItem('pwa_install_time', this.installTime.toString())
    })
  }

  private trackPerformance() {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.trackMetric('LCP', lastEntry.startTime)
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime
          this.trackMetric('FID', fid)
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            this.trackMetric('CLS', clsValue)
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    }
  }

  public trackEvent(eventName: string, data?: any) {
    console.log(`[PWA Analytics] ${eventName}`, data)
    
    // Here you can send to your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, data)
    }
  }

  public trackMetric(metricName: string, value: number) {
    console.log(`[PWA Metric] ${metricName}:`, value)
    
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metricName,
        value: Math.round(value),
        non_interaction: true
      })
    }
  }

  public trackOfflineUsage() {
    const offlineTimeStart = Date.now()
    
    const handleOnline = () => {
      const offlineDuration = Date.now() - offlineTimeStart
      this.trackEvent('offline_usage', {
        duration: offlineDuration,
        pages_visited: this.getOfflinePageVisits()
      })
      window.removeEventListener('online', handleOnline)
    }

    window.addEventListener('offline', () => {
      this.trackEvent('went_offline')
      window.addEventListener('online', handleOnline)
    })
  }

  private getOfflinePageVisits(): number {
    const visits = localStorage.getItem('offline_page_visits')
    return visits ? parseInt(visits, 10) : 0
  }

  public isInstalled(): boolean {
    return this.isStandalone
  }

  public getInstallDuration(): number | null {
    const installTime = localStorage.getItem('pwa_install_time')
    if (installTime) {
      return Date.now() - parseInt(installTime, 10)
    }
    return null
  }
}

// Initialize analytics
if (typeof window !== 'undefined') {
  const analytics = PWAAnalytics.getInstance()
  analytics.trackOfflineUsage()
}

export default PWAAnalytics
