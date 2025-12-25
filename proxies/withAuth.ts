import {jwtVerify} from 'jose'
import {type NextFetchEvent, type NextRequest, NextResponse} from 'next/server'
import {config} from '@/config'
import {PAGES} from '@/constants'
import type {CustomProxy} from '@/proxies/chain'

const AUTH_PAGE_REGEX = /^\/([a-z]{2}\/)?auth(\/.*)?$/
const CHAT_PAGE_REGEX = /^\/([a-z]{2}\/)?chat(\/.*)?$/

export const withAuthProxy = (middleware: CustomProxy) => {
	return async (request: NextRequest, event: NextFetchEvent) => {
		const {pathname} = request.nextUrl

		//Check JWT
		const sessionToken = request.cookies.get('better-auth.session_data')?.value
		let isAuthorized = await isValidJWT(sessionToken)
		let serverSetCookie: string | null = null

		//If JWT cookie is dead, then check session
		if (!isAuthorized) {
			const {authorized, setCookie} = await checkServerAuth(request.headers.get('cookie'))
			isAuthorized = authorized
			serverSetCookie = setCookie
		}

		let response: NextResponse | Response | null = null

		//Redirects
		const isAuthPage = AUTH_PAGE_REGEX.test(pathname)
		const isChatPage = CHAT_PAGE_REGEX.test(pathname)

		//User is on auth page -> redirect
		if (isAuthPage && isAuthorized) {
			response = NextResponse.redirect(new URL(PAGES.MAIN, request.url))
			//User is on chat's page and unauthorized -> login page
		} else if (isChatPage && !isAuthorized) {
			response = NextResponse.redirect(new URL(PAGES.LOGIN, request.url))
		} else {
			//response = await middleware(request, event, NextResponse.next())
			const result = await middleware(request, event, NextResponse.next())
			response = result ?? null
		}

		const finalResponse = response || NextResponse.next()

		if (serverSetCookie) {
			finalResponse.headers.append('Set-Cookie', serverSetCookie)
		}

		return finalResponse
	}
}

const isValidJWT = async (token?: string): Promise<boolean> => {
	if (!token) return false

	try {
		const secret = new TextEncoder().encode(config.better_auth_secret)
		await jwtVerify(token, secret)
		return true
	} catch {
		return false
	}
}

const checkServerAuth = async (
	cookieHeader: string | null
): Promise<{authorized: boolean; setCookie: string | null}> => {
	try {
		const res = await fetch(`${config.server_api_url}/auth/get-session`, {
			headers: {
				Cookie: cookieHeader || ''
			},
			cache: 'no-cache'
		})
		if (!res.ok) return {authorized: false, setCookie: null}

		const data = await res.json()
		return {
			authorized: !!data?.user,
			setCookie: res.headers.get('set-cookie')
		}
	} catch (e) {
		return {authorized: false, setCookie: null}
	}
}
