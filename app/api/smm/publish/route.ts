import { NextResponse } from 'next/server';
import { getDrafts } from '@/lib/smm-db';
import { publishToPlatform } from '@/lib/smm-publisher';
import { verifySmmAuth, unauthorizedResponse } from '@/lib/smm-auth';

export async function POST(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Draft ID is required.' }, { status: 400 });
    }

    const drafts = await getDrafts();
    const draft = drafts.find(d => d.id === id);

    if (!draft) {
      return NextResponse.json({ error: 'Draft not found.' }, { status: 404 });
    }

    const result = await publishToPlatform(draft);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
