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
  ShieldCheck,
  Settings
} from "lucide-react"

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState(true)

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
        {/* Page Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{t('settingsTitle')}</h1>
              <p className="text-muted-foreground">Customize your experience</p>
            </div>
          </div>
        </div>

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
        </div>
      </div>
    </PageLayout>
  )
}
