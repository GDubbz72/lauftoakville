import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';

interface BookTourRequest {
  name: string;
  email: string;
  phone: string;
  postal_code: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookTourRequest;

    const { name, email, phone, postal_code } = body;

    if (!name || !email || !phone || !postal_code) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: existingSubmission, error: selectError } = await supabase
      .from('book_tours')
      .select('id')
      .eq('email', email)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString())
      .limit(1);

    if (selectError) {
      console.error('Error checking existing submission:', selectError);
      return NextResponse.json(
        { error: 'Failed to check submission status' },
        { status: 500 }
      );
    }

    if (existingSubmission && existingSubmission.length > 0) {
      return NextResponse.json(
        { error: 'Please wait before submitting again.' },
        { status: 429 }
      );
    }

    const { error: insertError } = await supabase
      .from('book_tours')
      .insert([
        {
          name,
          email,
          phone,
          postal_code,
        },
      ]);

    if (insertError) {
      console.error('Error inserting tour booking:', insertError);
      console.error('Error details:', JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { error: `Failed to submit: ${insertError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Tour booking submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
