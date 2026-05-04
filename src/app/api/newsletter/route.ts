import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}
if (!supabaseServiceKey) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
