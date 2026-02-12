"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

interface Location {
  id: string
  no: number
  code: string
  location: string
  delivery: string
  deliveryMode?: string
  lat: string
  lng: string
}

interface RouteMapProps {
  locations: Location[]
}

// Component to handle map bounds and center updates
function MapController({ locations }: { locations: Location[] }) {
  const map = useMap()
  const boundsSetRef = useRef(false)

  useEffect(() => {
    if (!locations || locations.length === 0) return

    // Filter valid locations with coordinates
    const validLocations = locations.filter((loc) => {
      const lat = parseFloat(loc.lat)
      const lng = parseFloat(loc.lng)
      return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
    })

    if (validLocations.length === 0) return

    // Create bounds from all valid locations
    const bounds = L.latLngBounds(
      validLocations.map((loc) => [parseFloat(loc.lat), parseFloat(loc.lng)])
    )

    // Only fit bounds once on initial load
    if (!boundsSetRef.current) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 })
      boundsSetRef.current = true
    }
  }, [locations, map])

  return null
}

// Create custom marker icons based on delivery mode
function getMarkerIcon(deliveryMode: string = "daily", code: string) {
  let color = "#3b82f6" // default blue
  
  switch (deliveryMode.toLowerCase()) {
    case "daily":
      color = "#22c55e" // green
      break
    case "weekday":
      color = "#3b82f6" // blue
      break
    case "alt1":
    case "alt 1":
      color = "#f59e0b" // orange
      break
    case "alt2":
    case "alt 2":
      color = "#ef4444" // red
      break
    case "weekend":
      color = "#a855f7" // purple
      break
  }

  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 21.9 12.5 41 12.5 41S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0Z" 
            fill="${color}" 
            stroke="#fff" 
            stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#fff"/>
      <text x="12.5" y="16" text-anchor="middle" font-size="8" font-weight="bold" fill="${color}">
        ${code}
      </text>
    </svg>
  `

  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  })
}

export function RouteMap({ locations }: RouteMapProps) {
  const [isMapReady, setIsMapReady] = useState(false)
  
  // Filter locations with valid coordinates
  const validLocations = locations.filter((loc) => {
    const lat = parseFloat(loc.lat)
    const lng = parseFloat(loc.lng)
    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0
  })

  // Calculate initial center
  const center: [number, number] = validLocations.length > 0
    ? [
        validLocations.reduce((sum, loc) => sum + parseFloat(loc.lat), 0) / validLocations.length,
        validLocations.reduce((sum, loc) => sum + parseFloat(loc.lng), 0) / validLocations.length,
      ]
    : [3.1390, 101.6869] // Default to KL center

  // Set map ready after a short delay to ensure tiles are loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  if (validLocations.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground">No locations with valid coordinates</p>
          <p className="text-sm text-muted-foreground mt-2">Add latitude and longitude to locations to display them on the map</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`h-full w-full rounded-lg overflow-hidden shadow-lg border transition-opacity duration-300 ${isMapReady ? 'opacity-100 map-fade-in' : 'opacity-0'}`}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController locations={validLocations} />
        {validLocations.map((location) => {
          const lat = parseFloat(location.lat)
          const lng = parseFloat(location.lng)
          
          return (
            <Marker
              key={location.id}
              position={[lat, lng]}
              icon={getMarkerIcon(location.deliveryMode || location.delivery, location.code)}
            >
              <Popup className="custom-popup">
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-semibold text-base mb-2 text-primary">
                    {location.location}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Code:</span>
                      <span className="font-medium">{location.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No:</span>
                      <span className="font-medium">{location.no}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery:</span>
                      <span className="font-medium">{location.delivery}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="text-muted-foreground">Coords:</span>
                      <span className="font-mono text-xs text-right">
                        {lat.toFixed(4)}, {lng.toFixed(4)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t flex gap-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-xs bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 text-center"
                    >
                      Google Maps
                    </a>
                    <a
                      href={`https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-center"
                    >
                      Waze
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
