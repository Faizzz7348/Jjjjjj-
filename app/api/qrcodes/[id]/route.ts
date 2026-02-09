import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PUT /api/qrcodes/[id] - Update QR code
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { imageUrl, destinationUrl, title, position, active } = body

    const qrCode = await (prisma as any).qrCodeImage.update({
      where: { id },
      data: {
        ...(imageUrl !== undefined && { imageUrl }),
        ...(destinationUrl !== undefined && { destinationUrl }),
        ...(title !== undefined && { title }),
        ...(position !== undefined && { position }),
        ...(active !== undefined && { active }),
      }
    })

    return NextResponse.json(qrCode)
  } catch (error) {
    console.error('Error updating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to update QR code' },
      { status: 500 }
    )
  }
}

// DELETE /api/qrcodes/[id] - Delete QR code
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await (prisma as any).qrCodeImage.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting QR code:', error)
    return NextResponse.json(
      { error: 'Failed to delete QR code' },
      { status: 500 }
    )
  }
}
