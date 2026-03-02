import { NextResponse } from 'next/server'

interface SubmitRequest {
  leadData: {
    name: string
    email: string
    company?: string
    role?: string
  }
  answers: number[]
  score: number
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    const body: SubmitRequest = await request.json()

    // Validate leadData
    if (!body.leadData?.name || typeof body.leadData.name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!body.leadData?.email || typeof body.leadData.email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(body.leadData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Validate answers
    if (!Array.isArray(body.answers) || body.answers.length !== 12) {
      return NextResponse.json(
        { success: false, error: 'Answers must be an array of 12 values' },
        { status: 400 }
      )
    }

    const validValues = [0, 0.5, 1]
    const allValid = body.answers.every((val) => validValues.includes(val))
    if (!allValid) {
      return NextResponse.json(
        { success: false, error: 'Each answer must be 0, 0.5, or 1' },
        { status: 400 }
      )
    }

    // Validate score
    if (typeof body.score !== 'number' || body.score < 0 || body.score > 12) {
      return NextResponse.json(
        { success: false, error: 'Score must be a number between 0 and 12' },
        { status: 400 }
      )
    }

    // Phase 1: Log the submission and return success
    // Phase 2 will add Resend email integration here
    console.log('[Checklist Submit] Lead captured:', {
      name: body.leadData.name,
      email: body.leadData.email,
      company: body.leadData.company,
      role: body.leadData.role,
      score: body.score,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      score: body.score,
    })
  } catch (error) {
    console.error('[Checklist Submit] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
