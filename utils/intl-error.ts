import type {TProp} from '@/types'

export const intlError = (t: TProp, name: string, type?: string): {message: string} => {
	if (!name || !type) {
		return {message: 'Unexpected error'}
	}
	const message = `errors.${name}.${type}`
	const translatedMessage = t(message)

	if (!translatedMessage || translatedMessage.endsWith(message)) {
		return {message: 'Unexpected error'}
	} else {
		return {message: t(`errors.${name}.${type}`)}
	}
}
