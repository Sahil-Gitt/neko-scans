import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const comicId = searchParams.get('comicId')
    
    if (comicId) {
      // Get chapters for a specific comic
      const chapters = await db.chapter.findMany({
        where: { comicId },
        orderBy: { chapterNum: 'asc' },
        include: {
          comic: {
            select: { title: true }
          }
        }
      })
      
      return NextResponse.json({ chapters })
    } else {
      // Get all chapters
      const chapters = await db.chapter.findMany({
        include: {
          comic: {
            select: { title: true }
          }
        },
        orderBy: [
          { comic: { title: 'asc' } },
          { chapterNum: 'asc' }
        ]
      })
      
      return NextResponse.json({ chapters })
    }
  } catch (error) {
    console.error('Error fetching chapters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, chapterNum, pages, comicId, publishedAt } = body

    // Validate required fields
    if (!title || !chapterNum || !comicId) {
      return NextResponse.json(
        { error: 'Title, chapter number, and comic ID are required' },
        { status: 400 }
      )
    }

    // Check if comic exists
    const comic = await db.comic.findUnique({
      where: { id: comicId }
    })

    if (!comic) {
      return NextResponse.json(
        { error: 'Comic not found' },
        { status: 404 }
      )
    }

    // Check if chapter number already exists for this comic
    const existingChapter = await db.chapter.findUnique({
      where: {
        comicId_chapterNum: {
          comicId,
          chapterNum: parseFloat(chapterNum)
        }
      }
    })

    if (existingChapter) {
      return NextResponse.json(
        { error: `Chapter ${chapterNum} already exists for this comic` },
        { status: 409 }
      )
    }

    const chapter = await db.chapter.create({
      data: {
        title,
        chapterNum: parseFloat(chapterNum),
        pages: pages || [],
        comicId,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date()
      },
      include: {
        comic: {
          select: { title: true }
        }
      }
    })

    // Update the comic's updatedAt timestamp
    await db.comic.update({
      where: { id: comicId },
      data: { updatedAt: new Date() }
    })

    return NextResponse.json(chapter, { status: 201 })
  } catch (error) {
    console.error('Error creating chapter:', error)
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    )
  }
}
