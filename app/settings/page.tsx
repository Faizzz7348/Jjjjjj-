"use client"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import PWAUtils from "@/lib/pwa-utils"
import { 
  Languages, 
  User, 
  Mail, 
  Palette, 
  Bell, 
  Shield, 
  Key, 
  ShieldCheck,
  Zap,
  Smartphone,
  Wifi,
  HardDrive,
  CheckCircle2,
  XCircle,
  Trash2,
  Download,
  RefreshCw
} from "lucide-react"

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)
  const [pwaInfo, setPwaInfo] = useState({
    isInstalled: false,
    displayMode: 'browser' as string,
    isOnline: true,
    platform: '',
    storage: null as any,
    connection: null as any,
    readiness: null as any
  })

  // Update PWA info
  useEffect(() => {
    const updateInfo = async () => {
      const storage = await PWAUtils.getStorageEstimate()
      const readiness = await PWAUtils.checkPWAReadiness()
      
      setPwaInfo({
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

    // Refresh every 5 seconds
    const interval = setInterval(updateInfo, 5000)

    return () => {
      window.removeEventListener('online', handleOnlineStatus)
      window.removeEventListener('offline', handleOnlineStatus)
      clearInterval(interval)
    }
  }, [])

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
    <PageLayout>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="h-9 w-9" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{t('settingsTitle')}</h1>
            <p className="text-sm text-muted-foreground">Manage your preferences</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <div className="space-y-4">
          {/* Language Settings */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Languages className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{t('language')}</h3>
                  <p className="text-sm text-muted-foreground">{t('selectLanguage')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="h-12 font-medium"
                >
                  🇬🇧 {t('english')}
                </Button>
                <Button
                  variant={language === 'ms' ? 'default' : 'outline'}
                  onClick={() => setLanguage('ms')}
                  className="h-12 font-medium"
                >
                  🇲🇾 {t('malay')}
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Profile</h3>
                  <p className="text-sm text-muted-foreground">Your account information</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Name</div>
                    <div className="font-medium">Admin User</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Email</div>
                    <div className="font-medium">admin@example.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Preferences</h3>
                  <p className="text-sm text-muted-foreground">Appearance and notifications</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{t('theme')}</div>
                      <div className="text-sm text-muted-foreground">Light or dark mode</div>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive updates and alerts</div>
                    </div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Security</h3>
                  <p className="text-sm text-muted-foreground">Protect your account</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Password</div>
                      <div className="text-sm text-muted-foreground">Last changed 30 days ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    Change
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">Extra layer of security</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PWA Debug Panel */}
          {process.env.NODE_ENV === 'development' && (
            <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">PWA Debug Panel</h3>
                    <p className="text-sm text-muted-foreground">Development tools and diagnostics</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Installation Status */}
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">Installation</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Installed:</span>
                        <span className="flex items-center gap-1 font-medium">
                          {pwaInfo.isInstalled ? (
                            <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Yes</>
                          ) : (
                            <><XCircle className="h-3.5 w-3.5 text-red-500" /> No</>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Display Mode:</span>
                        <span className="font-mono text-xs">{pwaInfo.displayMode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform:</span>
                        <span className="font-medium">{pwaInfo.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Can Install:</span>
                        <span className="flex items-center gap-1 font-medium">
                          {PWAUtils.canInstall() ? (
                            <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Yes</>
                          ) : (
                            <><XCircle className="h-3.5 w-3.5 text-yellow-500" /> No</>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Network Status */}
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Wifi className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">Network</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="flex items-center gap-1 font-medium">
                          {pwaInfo.isOnline ? (
                            <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Online</>
                          ) : (
                            <><XCircle className="h-3.5 w-3.5 text-red-500" /> Offline</>
                          )}
                        </span>
                      </div>
                      {pwaInfo.connection && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span className="font-mono text-xs">{pwaInfo.connection.effectiveType}</span>
                          </div>
                          {pwaInfo.connection.downlink && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Speed:</span>
                              <span className="font-medium">{pwaInfo.connection.downlink} Mbps</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Storage */}
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">Storage</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {pwaInfo.storage ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Used:</span>
                            <span className="font-medium">{PWAUtils.formatBytes(pwaInfo.storage.usage || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Quota:</span>
                            <span className="font-medium">{PWAUtils.formatBytes(pwaInfo.storage.quota || 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Usage:</span>
                            <span className="font-medium">{pwaInfo.storage.usagePercent?.toFixed(2)}%</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground text-xs">Storage API not available</p>
                      )}
                    </div>
                  </div>

                  {/* PWA Readiness */}
                  <div className="p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">PWA Readiness</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {pwaInfo.readiness && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">HTTPS:</span>
                            <span className="flex items-center gap-1 font-medium">
                              {pwaInfo.readiness.isHTTPS ? (
                                <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Yes</>
                              ) : (
                                <><XCircle className="h-3.5 w-3.5 text-red-500" /> No</>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Manifest:</span>
                            <span className="flex items-center gap-1 font-medium">
                              {pwaInfo.readiness.hasManifest ? (
                                <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Yes</>
                              ) : (
                                <><XCircle className="h-3.5 w-3.5 text-red-500" /> No</>
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service Worker:</span>
                            <span className="flex items-center gap-1 font-medium">
                              {pwaInfo.readiness.hasServiceWorker ? (
                                <><CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> Yes</>
                              ) : (
                                <><XCircle className="h-3.5 w-3.5 text-red-500" /> No</>
                              )}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleClearCache}
                      className="flex-1"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      Clear Cache
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleUnregisterSW}
                      className="flex-1"
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Unregister SW
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
