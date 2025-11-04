export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/resumes/:path*", '/resume-history'] }