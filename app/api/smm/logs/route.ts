import { NextResponse } from 'next/server';
import { getLogs } from '@/lib/smm-db';
import { verifySmmAuth, unauthorizedResponse } from '@/lib/smm-auth';

export async function GET(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const logs = getLogs();
    return NextResponse.json(logs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
