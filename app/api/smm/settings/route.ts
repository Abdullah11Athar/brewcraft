import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/smm-db';
import { verifySmmAuth, unauthorizedResponse } from '@/lib/smm-auth';

export async function GET(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const settings = getSettings();
    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const body = await request.json();
    const updated = updateSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
