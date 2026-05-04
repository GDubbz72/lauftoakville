import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';

interface RoadmapRequest {
  name: string;
  email: string;
  current_workspace: string;
  company_size: string;
  website?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RoadmapRequest;

    const { name, email, current_workspace, company_size, website } = body;

    if (website) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

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
