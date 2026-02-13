"use client"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { 
  Languages, 
  User, 
  Mail, 
  Palette, 
  Bell, 
  Shield, 
  Key, 
  ShieldCheck
} from "lucide-react"

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)

  return (
    <PageLayout>
      {/* Header - Responsive with media queries */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="flex h-14 md:h-16 items-center gap-3 md:gap-4 px-4 md:px-6">
          <SidebarTrigger className="h-9 md:h-10 w-9 md:w-10" />
          <div className="flex-1 min-w-0">
            <h1 className="text-lg md:text-xl font-semibold truncate">{t('settingsTitle')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground truncate">Manage your preferences</p>
          </div>
        </div>
      </div>

      {/* Content - Responsive padding and spacing */}
      <div className="flex flex-col gap-4 md:gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-3 md:space-y-4">
          {/* Language Settings */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-blue-500/10">
                  <Languages className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold truncate">{t('language')}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{t('selectLanguage')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => setLanguage('en')}
                  className="h-10 md:h-12 text-sm md:text-base font-medium active:scale-95 touch-manipulation"
                >
                  🇬🇧 {t('english')}
                </Button>
                <Button
                  variant={language === 'ms' ? 'default' : 'outline'}
                  onClick={() => setLanguage('ms')}
                  className="h-10 md:h-12 text-sm md:text-base font-medium active:scale-95 touch-manipulation"
                >
                  🇲🇾 {t('malay')}
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-green-500/10">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold truncate">Profile</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Your account information</p>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-3 rounded-lg bg-muted/50">
                  <User className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm font-medium text-muted-foreground">Name</div>
                    <div className="text-sm md:text-base font-medium truncate">Admin User</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 p-3 md:p-3 rounded-lg bg-muted/50">
                  <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm font-medium text-muted-foreground">Email</div>
                    <div className="text-sm md:text-base font-medium truncate">admin@example.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="group rounded-xl border bg-card hover:shadow-md transition-all duration-200">
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-purple-500/10">
                  <Palette className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold truncate">Preferences</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Appearance and notifications</p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <Palette className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm md:text-base font-medium truncate">{t('theme')}</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">Light or dark mode</div>
                    </div>
                  </div>
                  <ThemeToggle />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm md:text-base font-medium truncate">Notifications</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">Receive updates and alerts</div>
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
            <div className="p-4 md:p-6 space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-red-500/10">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base md:text-lg font-semibold truncate">Security</h3>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">Protect your account</p>
                </div>
              </div>
              
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <Key className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm md:text-base font-medium truncate">Password</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">Last changed 30 days ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary text-xs md:text-sm active:scale-95 touch-manipulation flex-shrink-0">
                    Change
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors gap-3">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm md:text-base font-medium truncate">Two-Factor Authentication</div>
                      <div className="text-xs md:text-sm text-muted-foreground truncate">Extra layer of security</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary text-xs md:text-sm active:scale-95 touch-manipulation flex-shrink-0">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
