"use client"

import { useDevice } from "@/hooks/use-device"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { X, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * DeviceInfo Component - Debug tool untuk developers
 * 
 * Usage:
 * 1. Import di page yang mahu debug:
 *    import { DeviceInfo } from "@/components/device-info"
 * 
 * 2. Add ke page (remove bila production):
 *    {process.env.NODE_ENV === 'development' && <DeviceInfo />}
 * 
 * 3. Component ini akan show floating button yang boleh toggle info panel
 */
export function DeviceInfo() {
  const [isOpen, setIsOpen] = useState(false)
  const device = useDevice()

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="sm"
        variant="outline"
        className="fixed bottom-4 right-4 z-[9999] shadow-lg"
      >
        <Smartphone className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-[9999] p-4 shadow-2xl max-w-sm w-full max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          Device Info (Dev Only)
        </h3>
        <Button
          onClick={() => setIsOpen(false)}
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3 text-xs">
        {/* Device Type */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">Device Type</div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${
              device.type === 'mobile' ? 'bg-green-500' : 
              device.type === 'tablet' ? 'bg-blue-500' : 'bg-purple-500'
            }`} />
            <span className="capitalize font-medium">{device.type}</span>
          </div>
        </div>

        {/* Flags */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">Device Flags</div>
          <div className="grid grid-cols-2 gap-1">
            <div>Mobile: {device.isMobile ? '✅' : '❌'}</div>
            <div>Tablet: {device.isTablet ? '✅' : '❌'}</div>
            <div>Desktop: {device.isDesktop ? '✅' : '❌'}</div>
            <div>Touch: {device.isTouchDevice ? '✅' : '❌'}</div>
          </div>
        </div>

        {/* Viewport */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">Viewport</div>
          <div className="space-y-1">
            <div>Width: {device.viewportWidth}px</div>
            <div>Height: {device.viewportHeight}px</div>
            <div>Orientation: {device.orientation}</div>
          </div>
        </div>

        {/* Safe Areas */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">Safe Areas</div>
          <div className="space-y-1">
            <div>Top: {device.safeAreaTop}px</div>
            <div>Bottom: {device.safeAreaBottom}px</div>
          </div>
        </div>

        {/* CSS Recommendations */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">Recommended CSS Classes</div>
          <div className="space-y-1 font-mono text-[10px]">
            <div>Header: h-14 md:h-16</div>
            <div>Button: h-9 md:h-10</div>
            <div>Padding: p-4 md:p-6</div>
            <div>Gap: gap-3 md:gap-4</div>
            <div>Title: text-lg md:text-xl</div>
          </div>
        </div>

        {/* User Agent */}
        <div className="p-2 bg-muted rounded">
          <div className="font-semibold mb-1">User Agent</div>
          <div className="break-all text-[10px] opacity-70">
            {typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-700 dark:text-yellow-400">
          <div className="font-semibold mb-1">⚠️ Development Only</div>
          <div>Remove before production deployment</div>
        </div>
      </div>
    </Card>
  )
}
