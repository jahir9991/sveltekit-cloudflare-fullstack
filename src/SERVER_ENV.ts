import { env } from "$env/dynamic/private";


export const SERVER_ENV = {
    API_URL: "/api",
    LOCAL_D1_PATH: '../getLocalDB',
    PROXY_HOST: 'http://127.0.0.1:8787',
    SUPABASE_PG_URL: String(env.SUPABASE_PG_URL),
    NEON_PG_URL: String(env.NEON_PG_URL),
    COCKROACH_PG_URL: String(env.COCKROACH_PG_URL)
}