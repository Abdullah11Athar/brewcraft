import { NextResponse } from 'next/server';

const FALLBACK_TOKEN = 'brewcraft_admin_2026';

/**
 * Validates the Authorization header of the request against the configured SMM_AUTH_TOKEN.
 * Returns true if valid, false otherwise.
 */
export function verifySmmAuth(request: Request): boolean {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.substring(7).trim();
    const serverToken = (process.env.SMM_AUTH_TOKEN || FALLBACK_TOKEN).trim();

    return token === serverToken;
  } catch {
    return false;
  }
}

/**
 * Reusable NextResponse for unauthorized SMM requests.
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized. Please configure and provide a valid Authorization Bearer token.' },
    { status: 401 }
  );
}
