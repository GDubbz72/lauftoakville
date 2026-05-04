import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';

interface NewsletterRequest {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NewsletterRequest;

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from('lauft_newsletter')
      .insert([
        {
          email: email.trim().toLowerCase(),
        },
      ]);

    if (insertError) {
      console.error('Error subscribing to newsletter:', insertError);
      console.error('Error details:', JSON.stringify(insertError, null, 2));

      if (insertError.message?.includes('duplicate') || insertError.code === '23505') {
        return NextResponse.json(
          { error: 'Already subscribed!' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: `Failed to subscribe: ${insertError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
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
