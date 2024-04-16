/**
 * https://nextjs.org/docs/app/building-your-application/routing/middleware
*/
export { auth as middleware } from "@/auth"

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}