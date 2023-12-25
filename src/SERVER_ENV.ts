import { env } from '$env/dynamic/private';

export const SERVER_ENV = {
	API_URL: '/api',
	LOCAL_D1_PATH: '../getLocalDB',
	SUPABASE_PG_URL: String(env.SUPABASE_PG_URL),
	NEON_PG_URL: String(env.NEON_PG_URL)
};
