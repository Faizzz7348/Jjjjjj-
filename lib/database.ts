import type { Route, Location, DeliveryMode } from '@/app/kuala-lumpur/data'

/**
 * Load all routes for a specific region from database via API
 */
export async function loadRoutes(region: string): Promise<Route[]> {
  try {
    const response = await fetch(`/api/routes?region=${region}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch routes')
    }
    
    const routes = await response.json()
    
    // Convert date strings back to Date objects
    return routes.map((route: any) => ({
      ...route,
      lastUpdateTime: new Date(route.lastUpdateTime),
    }))
  } catch (error) {
    console.error('Error loading routes:', error)
    return []
  }
}

/**
 * Save a single route to database via API
 */
export async function saveRoute(route: Route, region: string): Promise<Route> {
  try {
    const method = route.id ? 'PUT' : 'POST'
    const url = route.id ? `/api/routes/${route.id}` : '/api/routes'
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...route,
        region,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to save route')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error saving route:', error)
    throw error
  }
}

/**
 * Save multiple routes at once (bulk save)
 */
export async function saveRoutes(routes: Route[], region: string): Promise<Route[]> {
  try {
    // Save each route individually
    const savedRoutes = await Promise.all(
      routes.map(route => saveRoute(route, region))
    )
    return savedRoutes
  } catch (error) {
    console.error('Error saving routes:', error)
    throw error
  }
}

/**
 * Delete a route and all its locations via API
 */
export async function deleteRoute(routeId: string, region: string): Promise<void> {
  try {
    const response = await fetch(`/api/routes/${routeId}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete route')
    }
  } catch (error) {
    console.error('Error deleting route:', error)
    throw error
  }
}

/**
 * Update a single location via API
 */
export async function updateLocation(location: Location, routeId: string, region: string): Promise<Location> {
  try {
    const response = await fetch(`/api/locations/${location.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update location')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating location:', error)
    throw error
  }
}

/**
 * Delete a location via API
 */
export async function deleteLocation(locationId: string, routeId: string, region: string): Promise<void> {
  try {
    const response = await fetch(`/api/locations/${locationId}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete location')
    }
  } catch (error) {
    console.error('Error deleting location:', error)
    throw error
  }
}

/**
 * Initialize database with seed data if empty
 */
export async function initializeDatabase(region: string, seedData: Route[]): Promise<void> {
  try {
    const existing = await loadRoutes(region)
    if (existing.length === 0) {
      await Promise.all(
        seedData.map(route => saveRoute(route, region))
      )
      console.log(`Initialized ${region} with ${seedData.length} routes`)
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}
