import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";
import { deleteCookie, getCookie } from './app/services/auth/tokenHandlers';

export async function proxy(request: NextRequest) {
    const accessToken = await getCookie("accessToken");
    const pathname = request.nextUrl.pathname;

    const authPages = ['/login', '/register'];
    const protectedRoutes = [
        '/user/dashboard',
        '/create-team',
        '/team-list',
        '/create-project',
        '/project-list',
        '/project-details'
    ];

    if (accessToken && authPages.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
    }

    if (!accessToken && protectedRoutes.some(path => pathname.startsWith(path))) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (accessToken) {
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
        } catch (err) {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");

            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
};
