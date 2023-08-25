import { env } from "$env/dynamic/private";


export const SERVER_ENV = {
    API_URL: "/api",
    LOCAL_DB_PATH: '../getLocalDB',
    PROXY_HOST:'http://127.0.0.1:8787',
    SUPABASE_PG_URL: env.SUPABASE_PG_URL
}