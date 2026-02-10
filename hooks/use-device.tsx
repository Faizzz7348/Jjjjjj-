"use client"

import { useState, useEffect } from "react"

export type DeviceType = "mobile" | "tablet" | "desktop"
export type DeviceOrientation = "portrait" | "landscape"

export interface DeviceInfo {
  type: DeviceType
  orientation: DeviceOrientation
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  viewportHeight: number
  viewportWidth: number
  safeAreaTop: number
  safeAreaBottom: number
  isClient: boolean
}

export function useDevice(): DeviceInfo {
  const [isClient, setIsClient] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: "desktop",
    orientation: "landscape",
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    viewportHeight: 0,
    viewportWidth: 0,
    safeAreaTop: 0,
    safeAreaBottom: 0,
    isClient: false,
  })

  useEffect(() => {
    // Mark as client-side
    setIsClient(true)
    
    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // Determine device type based on width
      let type: DeviceType = "desktop"
      if (width < 640) {
        type = "mobile"
      } else if (width < 1024) {
        type = "tablet"
      }

      // Determine orientation
      const orientation: DeviceOrientation = width > height ? "landscape" : "portrait"

      // Get safe area insets
      const getSafeAreaValue = (property: string): number => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(property)
        return parseInt(value) || 0
      }

      setDeviceInfo({
        type,
        orientation,
        isMobile: type === "mobile",
        isTablet: type === "tablet",
        isDesktop: type === "desktop",
        isTouchDevice,
        viewportHeight: height,
        viewportWidth: width,
        safeAreaTop: getSafeAreaValue("--sat") || 0,
        safeAreaBottom: getSafeAreaValue("--sab") || 0,
        isClient: true,
      })
    }

    // Initial update
    updateDeviceInfo()

    // Listen for resize and orientation changes
    window.addEventListener("resize", updateDeviceInfo)
    window.addEventListener("orientationchange", updateDeviceInfo)

    // Clean up
    return () => {
      window.removeEventListener("resize", updateDeviceInfo)
      window.removeEventListener("orientationchange", updateDeviceInfo)
    }
  }, [])

  return deviceInfo
}

// Helper hook for responsive header height
export function useResponsiveHeight() {
  const device = useDevice()
  
  // During SSR or before client hydration, use desktop defaults to prevent mismatch
  // After hydration, use actual device-specific values
  if (!device.isClient) {
    return {
      header: "h-16",
      headerPx: 64,
      button: "h-10",
      input: "h-11",
      padding: "p-6",
      paddingX: "px-6",
      paddingY: "py-6",
      gap: "gap-4",
      text: {
        title: "text-xl",
        heading: "text-3xl",
        body: "text-base",
      },
      isClient: false,
    }
  }
  
  return {
    header: device.isMobile ? "h-14" : "h-16",
    headerPx: device.isMobile ? 56 : 64,
    button: device.isMobile ? "h-9" : "h-10",
    input: device.isMobile ? "h-10" : "h-11",
    padding: device.isMobile ? "p-4" : "p-6",
    paddingX: device.isMobile ? "px-4" : "px-6",
    paddingY: device.isMobile ? "py-4" : "py-6",
    gap: device.isMobile ? "gap-3" : "gap-4",
    text: {
      title: device.isMobile ? "text-lg" : "text-xl",
      heading: device.isMobile ? "text-2xl" : "text-3xl",
      body: device.isMobile ? "text-sm" : "text-base",
    },
    isClient: true,
  }
}
