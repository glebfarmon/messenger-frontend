export const config = {
	title: process.env.NEXT_PUBLIC_TITLE ?? '',
	url: process.env.NEXT_PUBLIC_URL ?? '',
	author: process.env.NEXT_PUBLIC_AUTHOR ?? '',
	api_url: process.env.NEXT_PUBLIC_API_URL ?? '',
	server_api_url: process.env.SERVER_API_URL ?? '',
	better_auth_secret: process.env.BETTER_AUTH_SECRET ?? ''
}
