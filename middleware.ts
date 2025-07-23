import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recording',
  '/personal',       // ✅ Make sure this has the slash
  '/meeting(.*)?',
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoutes(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

