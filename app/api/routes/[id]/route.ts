import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/routes/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, location, name, delivery, description, shift, deliveryMode, active, locations } = body

    // Update route and handle locations
    const route: any = await prisma.route.update({
      where: { id },
      data: {
        ...(code && { code }),
        ...((location || name) && { name: location || name }),  // Accept either location or name
        ...((delivery !== undefined || description !== undefined) && { description: delivery || description }),
        ...(shift && { shift }),
        ...(deliveryMode !== undefined && { deliveryMode }),
        ...(active !== undefined && { active }),
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

    // If locations are provided, update them
    if (locations && Array.isArray(locations)) {
      // Get existing location IDs
      const existingLocationIds = (route.locations || []).map((loc: any) => loc.id)
      const newLocationIds = locations.filter((loc: any) => loc.id).map((loc: any) => loc.id)

      // Delete locations that are not in the new list
      const toDelete = existingLocationIds.filter((id: string) => !newLocationIds.includes(id))
      if (toDelete.length > 0) {
        await prisma.location.deleteMany({
          where: { id: { in: toDelete } }
        })
      }

      // Update or create locations
      for (const loc of locations) {
        if (loc.id) {
          // Use upsert to handle cases where location might not exist
          await prisma.location.upsert({
            where: { id: loc.id },
            update: {
              code: loc.code,
              name: loc.location || loc.name || 'Unnamed Location',  // Accept either location or name with fallback
              address: loc.address || '',  // Don't use delivery field as fallback
              contact: loc.contact || '',
              notes: loc.notes || '',
              position: loc.no !== undefined ? loc.no : loc.position,  // Accept either no or position
              deliveryMode: loc.deliveryMode || 'daily',
              lat: loc.lat,
              lng: loc.lng,
              active: loc.active !== undefined ? loc.active : true,
            } as any,
            create: {
              id: loc.id,
              routeId: id,
              code: loc.code,
              name: loc.location || loc.name || 'Unnamed Location',  // Provide fallback
              address: loc.address || '',
              contact: loc.contact || '',
              notes: loc.notes || '',
              position: loc.no !== undefined ? loc.no : loc.position,
              deliveryMode: loc.deliveryMode || 'daily',
              lat: loc.lat || '',
              lng: loc.lng || '',
              active: loc.active !== undefined ? loc.active : true,
            } as any
          })

          // Update delivery schedules
          if (loc.deliverySchedule) {
            // Delete existing schedules and recreate
            await prisma.deliverySchedule.deleteMany({
              where: { locationId: loc.id }
            })
            
            if (loc.deliverySchedule.length > 0) {
              await prisma.deliverySchedule.createMany({
                data: loc.deliverySchedule.map((schedule: any) => ({
                  locationId: loc.id,
                  day: schedule.day,
                  mode: schedule.mode,
                  startDate: schedule.startDate ? new Date(schedule.startDate) : null,
                  endDate: schedule.endDate ? new Date(schedule.endDate) : null,
                }))
              })
            }
          }

          // Update QR codes
          if (loc.qrCodeImages !== undefined) {
            // Delete existing QR codes and recreate
            await (prisma as any).qrCodeImage.deleteMany({
              where: { locationId: loc.id }
            })
            
            if (loc.qrCodeImages.length > 0) {
              await (prisma as any).qrCodeImage.createMany({
                data: loc.qrCodeImages.map((qr: any, qrIndex: number) => ({
                  locationId: loc.id,
                  imageUrl: qr.imageUrl,
                  destinationUrl: qr.destinationUrl,
                  title: qr.title,
                  position: qr.position !== undefined ? qr.position : qrIndex,
                  active: true
                }))
              })
            }
          }
        } else {
          // Create new location
          await prisma.location.create({
            data: {
              routeId: id,
              code: loc.code,
              name: loc.location || loc.name || 'Unnamed Location',  // Provide fallback
              address: loc.address || '',  // Don't use delivery field as fallback
              contact: loc.contact || '',
              notes: loc.notes || '',
              position: loc.no !== undefined ? loc.no : loc.position,
              deliveryMode: loc.deliveryMode || 'daily',
              lat: loc.lat || '',
              lng: loc.lng || '',
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
            } as any
          })
        }
      }
    }

    // Fetch updated route with all relations
    const updatedRoute = await prisma.route.findUnique({
      where: { id },
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
      }
    })

    return NextResponse.json(updatedRoute)
  } catch (error) {
    console.error('Error updating route:', error)
    return NextResponse.json(
      { error: 'Failed to update route' },
      { status: 500 }
    )
  }
}

// DELETE /api/routes/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.route.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting route:', error)
    return NextResponse.json(
      { error: 'Failed to delete route' },
      { status: 500 }
    )
  }
}
