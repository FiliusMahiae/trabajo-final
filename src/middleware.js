import { NextResponse } from 'next/server';

export function middleware(request) {
    const token = request.cookies.get('jwt')?.value;
    const { pathname } = request.nextUrl;

    if (!token && pathname !== '/login' && pathname !== '/register') {
        console.log('Redirigiendo a /login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && (pathname === '/login' || pathname === '/register')) {
        console.log('Redirigiendo a /dashboard');
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    console.log('Acceso permitido a:', pathname);
    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
