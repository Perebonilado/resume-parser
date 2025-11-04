export { default as proxy } from "next-auth/middleware"


export const config = { matcher: ["/", "/resumes/:path*", '/resume-history'] }