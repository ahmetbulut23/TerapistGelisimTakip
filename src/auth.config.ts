import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
        newUser: '/register',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/');
            const isLoginPage = nextUrl.pathname.startsWith('/login');
            const isRegisterPage = nextUrl.pathname.startsWith('/register');
            const isStatic = nextUrl.pathname.startsWith('/_next') || nextUrl.pathname.includes('.'); // images, etc.

            if (isStatic) return true;

            if (isOnDashboard) {
                if (isLoginPage || isRegisterPage) {
                    if (isLoggedIn) {
                        return Response.redirect(new URL('/', nextUrl)); // Redirect to dashboard if already logged in
                    }
                    return true; // Allow access to login/register pages
                }

                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
