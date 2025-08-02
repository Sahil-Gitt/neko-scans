import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test basic connection
    await db.$queryRaw`SELECT 1`
    
    // Test if tables exist
    const comicCount = await db.comic.count()
    
    // Test a more complex query
    const recentComics = await db.comic.findMany({
      take: 1,
      select: { id: true, title: true }
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      comicCount,
      hasData: recentComics.length > 0,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    
    // More detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
