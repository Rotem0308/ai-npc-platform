export const env = {
  NODE_ENV: process.env.NODE_ENV!,
  DATABASE_URL: process.env.DATABASE_URL!,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
};
