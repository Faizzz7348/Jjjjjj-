"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Inbox,
  Settings,
  Search,
  ChevronUp,
  ChevronDown,
  User2,
  Calendar,
  File,
  MapPin,
  Sparkles,
  LogOut,
  UserCircle,
  CreditCard,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Menu items - Simplified professional colors
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

const projects = [
  {
    title: "Route List",
    url: "#",
    icon: MapPin,
    items: [
      {
        title: "Selangor",
        url: "/selangor",
        badge: "12",
      },
      {
        title: "Kuala Lumpur",
        url: "/kuala-lumpur",
        badge: "8",
      },
    ],
  },
  {
    title: "Plano",
    url: "#",
    icon: Sparkles,
    items: [
      {
        title: "Standard",
        url: "/standard",
        badge: undefined,
      },
      {
        title: "Analytics",
        url: "#",
        badge: undefined,
      },
    ],
  },
]

export function AppSidebar() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => {
      const isCurrentlyOpen = prev[title]
      // Tutup semua menu lain dan buka yang dipilih - animasi serentak
      const newState: Record<string, boolean> = {}
      
      // Set semua menu lain ke false untuk trigger sliding close
      Object.keys(prev).forEach(key => {
        newState[key] = false
      })
      
      // Toggle menu yang dipilih
      if (!isCurrentlyOpen) {
        newState[title] = true
      }
      
      return newState
    })
  }

  return (
    <Sidebar className="h-full border-r">
      {/* Header - Clean & Simple */}
      <SidebarHeader className="p-4 border-b bg-muted/30">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent transition-colors">
              <a href="#" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary/90 text-primary-foreground">
                  <Home className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-sm">VMRF System</span>
                  <span className="text-[10px] text-muted-foreground">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-2 py-3">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5 mt-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-9 hover:bg-accent transition-colors"
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        <SidebarSeparator className="my-3" />

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Workspaces
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5 mt-1">
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton 
                    onClick={(e) => {
                      e.preventDefault()
                      toggleMenu(project.title)
                    }}
                    className="h-9 cursor-pointer hover:bg-accent transition-colors"
                  >
                    <project.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{project.title}</span>
                    {project.items?.length ? (
                      <div className="ml-auto">
                        {openMenus[project.title] ? (
                          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200" />
                        )}
                      </div>
                    ) : null}
                  </SidebarMenuButton>
                  <div 
                    className={cn(
                      "grid transition-all duration-200 ease-out",
                      openMenus[project.title] 
                        ? 'grid-rows-[1fr] opacity-100' 
                        : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      {project.items?.length ? (
                        <SidebarMenuSub className="py-1 px-2 ml-5 border-l border-border/50">
                          {project.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                className="h-8 hover:bg-accent/50 transition-colors"
                              >
                                <Link href={item.url} className="flex items-center justify-between">
                                  <span className="text-sm">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      ) : null}
                    </div>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer - Clean User Section */}
      <SidebarFooter className="p-2 border-t mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <User2 className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-medium truncate">Admin User</span>
                      <span className="text-[10px] text-muted-foreground truncate">admin@vmrf.com</span>
                    </div>
                    <ChevronUp className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-56"
              >
                <DropdownMenuLabel className="font-medium">Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
