import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/routes?region=selangor
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const region = searchParams.get('region')

    if (!region) {
      return NextResponse.json(
        { error: 'Region parameter is required' },
        { status: 400 }
      )
    }

    const routes = await prisma.route.findMany({
      where: { region },
      include: {
        locations: {
          include: {
            deliverySchedule: true,
            qrCodeImages: true
          } as any,
          orderBy: {
            position: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    }) as any

    // Transform to match the frontend data structure
    const transformedRoutes = routes.map((route: any) => ({
      id: route.id,
      code: route.code,
      location: route.name,  // name → location
      delivery: route.description || route.deliveryMode || '',  // description → delivery
      shift: route.shift as "AM" | "PM" || "AM",
      deliveryMode: route.deliveryMode,
      lastUpdateTime: route.updatedAt,
      locations: route.locations.map((loc: any) => {
        // Map deliveryMode to delivery display text
        let deliveryDisplay = '';
        switch(loc.deliveryMode) {
          case 'daily': deliveryDisplay = 'Daily'; break;
          case 'alt1': deliveryDisplay = 'Alt 1'; break;
          case 'alt2': deliveryDisplay = 'Alt 2'; break;
          case 'weekday': deliveryDisplay = 'Weekday'; break;
          case 'weekend': deliveryDisplay = 'Weekend'; break;
          default: deliveryDisplay = 'Daily';
        }
        
        return {
        id: loc.id,
        no: loc.position,  // position → no
        code: loc.code,
        location: loc.name,  // name → location
        delivery: deliveryDisplay,  // deliveryMode → delivery display text
        deliveryMode: loc.deliveryMode || 'daily',
        lat: loc.lat || '',
        lng: loc.lng || '',
        qrCodeImages: (loc.qrCodeImages || []).map((qr: any) => ({
          id: parseInt(qr.id) || 0,
          imageUrl: qr.imageUrl,
          destinationUrl: qr.destinationUrl,
          title: qr.title,
        })),
        // Include raw fields for editing
        name: loc.name,
        address: loc.address,
        contact: loc.contact,
        notes: loc.notes,
        position: loc.position,
        active: loc.active,
        deliverySchedule: (loc.deliverySchedule || []).map((schedule: any) => ({
          day: schedule.day,
          mode: schedule.mode,
          startDate: schedule.startDate?.toISOString() || null,
          endDate: schedule.endDate?.toISOString() || null,
        }))
      }})
    }))

    return NextResponse.json(transformedRoutes)
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch routes' },
      { status: 500 }
    )
  }
}

// POST /api/routes
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, location, delivery, shift, deliveryMode, region, locations = [] } = body

    if (!code || !location || !region) {
      return NextResponse.json(
        { error: 'Code, location, and region are required' },
        { status: 400 }
      )
    }

    const route: any = await prisma.route.create({
      data: {
        code,
        name: location,  // location → name
        description: delivery || '',  // delivery → description
        shift: shift || 'AM',
        deliveryMode: deliveryMode || '',
        region,
        active: true,
        locations: {
          create: locations.map((loc: any, index: number) => ({
            code: loc.code,
            name: loc.location || loc.name,  // location → name
            address: loc.address || '',  // Don't use delivery field as fallback
            contact: loc.contact || '',
            notes: loc.notes || '',
            position: loc.no !== undefined ? loc.no : (loc.position !== undefined ? loc.position : index),  // no → position
            deliveryMode: loc.deliveryMode || 'daily',
            lat: loc.lat,
            lng: loc.lng,
            active: loc.active !== undefined ? loc.active : true,
            deliverySchedule: {
              create: (loc.deliverySchedule || []).map((schedule: any) => ({
                day: schedule.day,
                mode: schedule.mode,
                startDate: schedule.startDate ? new Date(schedule.startDate) : null,
                endDate: schedule.endDate ? new Date(schedule.endDate) : null,
              }))
            },
            qrCodeImages: {
              create: (loc.qrCodeImages || []).map((qr: any, qrIndex: number) => ({
                imageUrl: qr.imageUrl,
                destinationUrl: qr.destinationUrl,
                title: qr.title,
                position: qr.position !== undefined ? qr.position : qrIndex,
                active: true
              }))
            }
          }))
        }
      } as any,
      include: {
        locations: {
          include: {
            deliverySchedule: true,
            qrCodeImages: true
          } as any
        }
      }
    })

    return NextResponse.json(route, { status: 201 })
  } catch (error) {
    console.error('Error creating route:', error)
    return NextResponse.json(
      { error: 'Failed to create route' },
      { status: 500 }
    )
  }
}
