'use client'

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactNode} from 'react'

/**
 * Creates a new QueryClient with optimized settings for Next.js
 */
function makeQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				gcTime: 5 * 60 * 1000,
				refetchOnWindowFocus: false,
				refetchOnReconnect: 'always',
				retry: 0
			},
			mutations: {
				gcTime: 5 * 60 * 1000
			}
		}
	})
}

let clientQueryClient: QueryClient | undefined

/**
 * Get or create a singleton QueryClient instance
 */
function getQueryClient(): QueryClient {
	if (!clientQueryClient) {
		clientQueryClient = makeQueryClient()
	}
	return clientQueryClient
}

interface QueryClientProviderProps {
	children: ReactNode
}

/**
 * QueryClientProvider wrapper for Next.js App Router
 * Manages caching and synchronization of server state across the app
 */
export function QueryProvider({children}: QueryClientProviderProps): ReactNode {
	const queryClient = getQueryClient()

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
