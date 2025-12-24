import {toast} from 'sonner'
import type {TProp} from '@/types'

//AUTH Error Interceptor
export const handleAuthError = (t: TProp) => {
	return (e: unknown) => authErrorHandler(e, t)
}

const authErrorHandler = (e: unknown, t: TProp) => {
	if (!e || typeof e !== 'object') return toast.error(t('errors.unknown'))

	//e.response.data.code
	if (
		'response' in e &&
		e.response &&
		typeof e.response === 'object' &&
		'data' in e.response &&
		e.response.data &&
		typeof e.response.data === 'object' &&
		'code' in e.response.data &&
		typeof e.response.data.code === 'string'
	) {
		return toast.error(t(`errors.${e.response.data.code.toLowerCase()}`))
	}

	return toast.error(t('errors.unknown'))
}
