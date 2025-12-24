import {type NextFetchEvent, type NextRequest, NextResponse} from 'next/server'
import {config} from '@/config'
import {PAGES} from '@/constants'
import type {CustomProxy} from '@/proxies/chain'

export const withAuthProxy = (middleware: CustomProxy) => {
	return async (request: NextRequest, event: NextFetchEvent) => {
		const response = NextResponse.next()
		const pathname = request.nextUrl.pathname

		const cookies = request.headers.get('cookie') || ''
		const isAuthorized = await checkAuthorization(cookies)

		//User is on auth page -> redirect
		if (isPage('auth', pathname) && isAuthorized) {
			const url = new URL(PAGES.MAIN, request.url)
			return NextResponse.redirect(url)
		}

		//User is on chat's page and unauthorized -> login page
		if (isPage('chat', pathname) && !isAuthorized) {
			const url = new URL(PAGES.LOGIN, request.url)
			return NextResponse.redirect(url)
		}

		return middleware(request, event, response)
	}
}

const checkAuthorization = async (cookie: string) => {
	try {
		const response = await fetch(`${config.api_url}/auth/get-session`, {
			headers: {
				Cookie: cookie
			},
			cache: 'no-cache'
		})
		const data = await response.json()
		return data !== null
	} catch (e) {
		return false
	}
}

const isPage = (page: string, pathname: string) => {
	const regex = new RegExp(`^\/([a-z]{2}\/)?${page}(\/.*)?$`)
	return regex.test(pathname)
}
