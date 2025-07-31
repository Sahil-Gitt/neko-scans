import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Try to connect to the database and perform a simple query
    await db.$queryRaw`SELECT 1`
    
    // Try to count comics (this will also test if the schema is properly set up)
    const comicCount = await db.comic.count()
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      comicCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
