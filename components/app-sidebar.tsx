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
      },
      {
        title: "Kuala Lumpur",
        url: "/kuala-lumpur",
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
      },
      {
        title: "Analytics",
        url: "#",
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
      {/* Header - Enhanced Design */}
      <SidebarHeader className="p-4 border-b bg-gradient-to-br from-primary/5 to-primary/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50 transition-all duration-200 hover:scale-[0.98]">
              <a href="#" className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20">
                  <Home className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-bold text-base tracking-tight">VMRF System</span>
                  <span className="text-[11px] text-muted-foreground font-medium">Version 1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-2 text-[11px] font-bold uppercase tracking-wider text-primary/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 mt-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-10 hover:bg-accent/80 transition-all duration-200 hover:translate-x-0.5 rounded-lg"
                  >
                    <Link href={item.url} className="flex items-center gap-3.5">
                      <div className="flex items-center justify-center w-5 h-5">
                        <item.icon className="h-[18px] w-[18px] text-muted-foreground" />
                      </div>
                      <span className="text-[14px] font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        <SidebarSeparator className="my-4" />

        {/* Projects Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-2 text-[11px] font-bold uppercase tracking-wider text-primary/70">
            Vending Machines
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 mt-2">
              {projects.map((project) => (
                <SidebarMenuItem key={project.title}>
                  <SidebarMenuButton 
                    onClick={(e) => {
                      e.preventDefault()
                      toggleMenu(project.title)
                    }}
                    className="h-9 cursor-pointer hover:bg-accent/80 transition-all duration-200 hover:translate-x-0.5 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <project.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="text-[15px] font-semibold">{project.title}</span>
                    {project.items?.length ? (
                      <div className="ml-auto">
                        {openMenus[project.title] ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
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
                        <SidebarMenuSub className="py-2 px-2 ml-6 border-l-2 border-primary/20">
                          {project.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton 
                                asChild 
                                className="h-10 hover:bg-accent/60 transition-all duration-200 hover:translate-x-1 rounded-md"
                              >
                                <Link href={item.url} className="flex items-center pl-2">
                                  <span className="text-[13px] font-medium">
                                    {item.title}
                                  </span>
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

      {/* Footer - Enhanced User Section */}
      <SidebarFooter className="p-3 border-t mt-auto bg-gradient-to-br from-muted/30 to-muted/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-14 hover:bg-accent/50 transition-all duration-200 hover:scale-[0.98] rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 text-primary ring-2 ring-primary/20">
                      <User2 className="h-[18px] w-[18px]" />
                    </div>
                    <div className="flex flex-col items-start flex-1 min-w-0 gap-0.5">
                      <span className="text-[13px] font-semibold truncate">Admin User</span>
                      <span className="text-[11px] text-muted-foreground truncate">admin@vmrf.com</span>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground ml-auto" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-52"
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
