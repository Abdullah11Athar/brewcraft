import { NextResponse } from 'next/server';
import { getDrafts, saveDraft, deleteDraft } from '@/lib/smm-db';
import { verifySmmAuth, unauthorizedResponse } from '@/lib/smm-auth';

export async function GET(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const drafts = getDrafts();
    return NextResponse.json(drafts);
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
    if (!body.title || !body.type) {
      return NextResponse.json({ error: 'Title and Type are required.' }, { status: 400 });
    }
    const saved = saveDraft(body);
    return NextResponse.json({ success: true, draft: saved });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!verifySmmAuth(request)) {
      return unauthorizedResponse();
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }
    const success = deleteDraft(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
