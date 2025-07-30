import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
            { genres: { has: search } },
          ],
        }
      : {}

    const comics = await db.comic.findMany({
      where,
      include: {
        chapters: {
          orderBy: { chapterNum: 'desc' },
          take: 3,
        },
        _count: {
          select: { chapters: true, favorites: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
      skip,
      take: limit,
    })

    const total = await db.comic.count({ where })

    return NextResponse.json({
      comics,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching comics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, author, genres, tags, coverImage } = body

    const comic = await db.comic.create({
      data: {
        title,
        description,
        author,
        genres: genres || [],
        tags: tags || [],
        coverImage,
      },
    })

    return NextResponse.json(comic, { status: 201 })
  } catch (error) {
    console.error('Error creating comic:', error)
    return NextResponse.json(
      { error: 'Failed to create comic' },
      { status: 500 }
    )
  }
}
