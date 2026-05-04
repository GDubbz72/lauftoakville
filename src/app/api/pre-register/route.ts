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

interface PreRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  postal_code: string;
  space_desired: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PreRegistrationRequest;

    const { name, email, phone, company, postal_code, space_desired } = body;

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
