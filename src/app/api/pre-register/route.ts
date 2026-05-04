import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';

interface PreRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  postal_code: string;
  space_desired: string;
  website?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PreRegistrationRequest;

    const { name, email, phone, company, postal_code, space_desired, website } = body;

    if (website) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    if (!name || !email || !phone || !company || !postal_code || !space_desired) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: existingSubmission, error: selectError } = await supabase
      .from('pre_registrations')
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
      .from('pre_registrations')
      .insert([
        {
          name,
          email,
          phone,
          company,
          postal_code,
          space_desired,
        },
      ]);

    if (insertError) {
      console.error('Error inserting pre-registration:', insertError);
      console.error('Error details:', JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { error: `Failed to submit: ${insertError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Pre-registration submitted successfully' },
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
