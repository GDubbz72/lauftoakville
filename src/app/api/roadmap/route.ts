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

interface RoadmapRequest {
  name: string;
  email: string;
  current_workspace: string;
  company_size: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RoadmapRequest;

    const { name, email, current_workspace, company_size } = body;

    if (!name || !email || !current_workspace || !company_size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { error: insertError } = await supabase
      .from('oakville_registrations')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          current_workspace,
          company_size,
        },
      ]);

    if (insertError) {
      console.error('Error inserting roadmap registration:', insertError);
      console.error('Error details:', JSON.stringify(insertError, null, 2));
      return NextResponse.json(
        { error: `Failed to submit: ${insertError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Roadmap registration submitted successfully' },
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
