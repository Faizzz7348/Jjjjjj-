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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10",
  },
]

const projects = [
  {
    title: "Route List",
    url: "#",
    icon: MapPin,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
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
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
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
      <SidebarHeader className="p-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50 transition-colors">
              <a href="#">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30">
                  <Home className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-base">VMRF System</span>
                  <span className="text-xs text-muted-foreground font-medium">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="group hover:bg-accent/50 transition-all duration-200 rounded-lg">
                    <Link href={item.url} className="flex items-center gap-3">
                      <div className={cn("p-1.5 rounded-md transition-colors", item.bgColor)}>
                        <item.icon className={cn("h-4 w-4", item.color)} />
                      </div>
                      <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4 bg-gradient-to-r from-transparent via-border to-transparent" />

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Vending Machines
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton 
                    onClick={(e) => {
                      e.preventDefault()
                      toggleMenu(project.title)
                    }}
                    className="group cursor-pointer hover:bg-accent/50 transition-all duration-200 rounded-lg"
                  >
                    <div className={cn("p-1.5 rounded-md transition-colors", project.bgColor)}>
                      <project.icon className={cn("h-4 w-4", project.color)} />
                    </div>
                    <span className="text-sm font-medium group-hover:translate-x-0.5 transition-transform">{project.title}</span>
                    {project.items?.length ? (
                      <div className="ml-auto">
                        {openMenus[project.title] ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground transition-transform" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                        )}
                      </div>
                    ) : null}
                  </SidebarMenuButton>
                  <div 
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      openMenus[project.title] 
                        ? 'grid-rows-[1fr] opacity-100' 
                        : 'grid-rows-[0fr] opacity-0'
                    )}
                  >
                    <div className="overflow-hidden">
                      {project.items?.length ? (
                        <SidebarMenuSub className="py-1 px-2 ml-3 border-l-2 border-primary/20">
                          {project.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                className="group hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md"
                              >
                                <Link href={item.url} className="flex items-center justify-between">
                                  <span className="text-sm font-medium group-hover:translate-x-1 transition-transform">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
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

      <SidebarFooter className="p-3 border-t mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="group hover:bg-accent/50 transition-all duration-200 rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-1.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-500/30">
                      <User2 className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-sm font-semibold truncate">Admin User</span>
                      <span className="text-xs text-muted-foreground truncate">admin@vmrf.com</span>
                    </div>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground ml-2" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-[240px]"
              >
                <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
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
