import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/locations/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { code, location, name, delivery, address, contact, notes, no, position, deliveryMode, lat, lng, active, deliverySchedule, qrCodeImages } = body

    // Update location
    await prisma.location.update({
      where: { id },
      data: {
        ...(code !== undefined && { code }),
        ...((location !== undefined || name !== undefined) && { name: location || name }),
        ...((delivery !== undefined || address !== undefined) && { address: delivery || address }),
        ...(contact !== undefined && { contact }),
        ...(notes !== undefined && { notes }),
        ...((no !== undefined || position !== undefined) && { position: no !== undefined ? no : position }),
        ...(deliveryMode !== undefined && { deliveryMode }),
        ...(lat !== undefined && { lat }),
        ...(lng !== undefined && { lng }),
        ...(active !== undefined && { active }),
      }
    })

    // Update delivery schedules if provided
    if (deliverySchedule !== undefined) {
      // Delete existing schedules
      await prisma.deliverySchedule.deleteMany({
        where: { locationId: id }
      })

      // Create new schedules
      if (deliverySchedule.length > 0) {
        await prisma.deliverySchedule.createMany({
          data: deliverySchedule.map((schedule: any) => ({
            locationId: id,
            day: schedule.day,
            mode: schedule.mode,
            startDate: schedule.startDate ? new Date(schedule.startDate) : null,
            endDate: schedule.endDate ? new Date(schedule.endDate) : null,
          }))
        })
      }
    }

    // Update QR codes if provided
    if (qrCodeImages !== undefined) {
      // Delete existing QR codes
      await (prisma as any).qrCodeImage.deleteMany({
        where: { locationId: id }
      })

      // Create new QR codes
      if (qrCodeImages.length > 0) {
        await (prisma as any).qrCodeImage.createMany({
          data: qrCodeImages.map((qr: any, qrIndex: number) => ({
            locationId: id,
            imageUrl: qr.imageUrl,
            destinationUrl: qr.destinationUrl,
            title: qr.title,
            position: qr.position !== undefined ? qr.position : qrIndex,
            active: true
          }))
        })
      }
    }

    // Fetch updated location with schedules
    const result = await prisma.location.findUnique({
      where: { id },
      include: {
        deliverySchedule: true,
        qrCodeImages: true
      } as any
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating location:', error)
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    )
  }
}

// DELETE /api/locations/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.location.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting location:', error)
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    )
  }
}
