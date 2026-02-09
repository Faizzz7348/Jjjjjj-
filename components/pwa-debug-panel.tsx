"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PWAUtils from "@/lib/pwa-utils"
import { 
  Smartphone, 
  Wifi, 
  HardDrive, 
  Zap, 
  CheckCircle2, 
  XCircle,
  Trash2,
  Download
} from "lucide-react"

export function PWADebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [info, setInfo] = useState({
    isInstalled: false,
    displayMode: 'browser' as string,
    isOnline: true,
    platform: '',
    storage: null as any,
    connection: null as any,
    readiness: null as any
  })

  useEffect(() => {
    const updateInfo = async () => {
      const storage = await PWAUtils.getStorageEstimate()
      const readiness = await PWAUtils.checkPWAReadiness()
      
      setInfo({
        isInstalled: PWAUtils.isInstalled(),
        displayMode: PWAUtils.getDisplayMode(),
        isOnline: PWAUtils.isOnline(),
        platform: PWAUtils.isIOS() ? 'iOS' : PWAUtils.isAndroid() ? 'Android' : 'Desktop',
        storage,
        connection: PWAUtils.getConnectionInfo(),
        readiness
      })
    }

    updateInfo()

    // Update online status
    const handleOnlineStatus = () => updateInfo()
    window.addEventListener('online', handleOnlineStatus)
    window.addEventListener('offline', handleOnlineStatus)

    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development' && !isOpen) {
    return null
  }

  const handleClearCache = async () => {
    if (confirm('Clear all caches? This will remove all offline data.')) {
      await PWAUtils.clearAllCaches()
      window.location.reload()
    }
  }

  const handleUnregisterSW = async () => {
    if (confirm('Unregister service workers? This will disable offline functionality.')) {
      await PWAUtils.unregisterServiceWorkers()
      window.location.reload()
    }
  }

  return (
    <>
      {/* Toggle button - only in dev */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-4 right-4 z-[100] bg-primary text-primary-foreground rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
          title="PWA Debug Panel"
        >
          <Zap className="h-5 w-5" />
        </button>
      )}

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[99] bg-background/80 backdrop-blur-sm p-4 overflow-auto">
          <div className="max-w-2xl mx-auto py-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  PWA Debug Panel
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  ✕
                </Button>
              </div>

              <div className="space-y-6">
                {/* Installation Status */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Smartphone className="h-5 w-5" />
                    Installation
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Installed:</span>
                      <span className="flex items-center gap-1">
                        {info.isInstalled ? (
                          <><CheckCircle2 className="h-4 w-4 text-green-500" /> Yes</>
                        ) : (
                          <><XCircle className="h-4 w-4 text-red-500" /> No</>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Display Mode:</span>
                      <span className="font-mono">{info.displayMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform:</span>
                      <span>{info.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Can Install:</span>
                      <span className="flex items-center gap-1">
                        {PWAUtils.canInstall() ? (
                          <><CheckCircle2 className="h-4 w-4 text-green-500" /> Yes</>
                        ) : (
                          <><XCircle className="h-4 w-4 text-yellow-500" /> No</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Network Status */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Wifi className="h-5 w-5" />
                    Network
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="flex items-center gap-1">
                        {info.isOnline ? (
                          <><CheckCircle2 className="h-4 w-4 text-green-500" /> Online</>
                        ) : (
                          <><XCircle className="h-4 w-4 text-red-500" /> Offline</>
                        )}
                      </span>
                    </div>
                    {info.connection && (
                      <>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-mono">{info.connection.effectiveType}</span>
                        </div>
                        {info.connection.downlink && (
                          <div className="flex justify-between">
                            <span>Speed:</span>
                            <span>{info.connection.downlink} Mbps</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Storage */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <HardDrive className="h-5 w-5" />
                    Storage
                  </h3>
                  <div className="space-y-2 text-sm">
                    {info.storage ? (
                      <>
                        <div className="flex justify-between">
                          <span>Used:</span>
                          <span>{PWAUtils.formatBytes(info.storage.usage || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quota:</span>
                          <span>{PWAUtils.formatBytes(info.storage.quota || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Usage:</span>
                          <span>{info.storage.usagePercent?.toFixed(2)}%</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Storage API not available</p>
                    )}
                  </div>
                </div>

                {/* PWA Readiness */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    PWA Readiness
                  </h3>
                  <div className="space-y-2 text-sm">
                    {info.readiness && (
                      <>
                        <div className="flex justify-between">
                          <span>HTTPS:</span>
                          <span className="flex items-center gap-1">
                            {info.readiness.isHTTPS ? (
                              <><CheckCircle2 className="h-4 w-4 text-green-500" /> Yes</>
                            ) : (
                              <><XCircle className="h-4 w-4 text-red-500" /> No</>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Manifest:</span>
                          <span className="flex items-center gap-1">
                            {info.readiness.hasManifest ? (
                              <><CheckCircle2 className="h-4 w-4 text-green-500" /> Yes</>
                            ) : (
                              <><XCircle className="h-4 w-4 text-red-500" /> No</>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service Worker:</span>
                          <span className="flex items-center gap-1">
                            {info.readiness.hasServiceWorker ? (
                              <><CheckCircle2 className="h-4 w-4 text-green-500" /> Yes</>
                            ) : (
                              <><XCircle className="h-4 w-4 text-red-500" /> No</>
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h3 className="font-semibold mb-3">Actions</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleClearCache}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Clear Cache
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleUnregisterSW}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Unregister SW
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
