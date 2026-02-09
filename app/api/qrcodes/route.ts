import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/qrcodes - Create QR code for a location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { locationId, imageUrl, destinationUrl, title, position } = body

    if (!locationId || !imageUrl || !destinationUrl || !title) {
      return NextResponse.json(
        { error: 'locationId, imageUrl, destinationUrl, and title are required' },
        { status: 400 }
      )
    }

    const qrCode = await (prisma as any).qrCodeImage.create({
      data: {
        locationId,
        imageUrl,
        destinationUrl,
        title,
        position: position !== undefined ? position : 0,
        active: true
      }
    })

    return NextResponse.json(qrCode, { status: 201 })
  } catch (error) {
    console.error('Error creating QR code:', error)
    return NextResponse.json(
      { error: 'Failed to create QR code' },
      { status: 500 }
    )
  }
}

// GET /api/qrcodes?locationId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const locationId = searchParams.get('locationId')

    if (!locationId) {
      return NextResponse.json(
        { error: 'locationId parameter is required' },
        { status: 400 }
      )
    }

    const qrCodes = await (prisma as any).qrCodeImage.findMany({
      where: { locationId },
      orderBy: {
        position: 'asc'
      }
    })

    return NextResponse.json(qrCodes)
  } catch (error) {
    console.error('Error fetching QR codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch QR codes' },
      { status: 500 }
    )
  }
}
