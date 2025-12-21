export const intlError = (t: (key: string) => string, name: string, type?: string) => {
	if (!name || !type) {
		return {message: 'Unexpected error'}
	}
	const message = `errors.${name}.${type}`
	const translatedMessage = t(message)

	if (!translatedMessage || translatedMessage.includes(message)) {
		return {message: 'Unexpected error'}
	} else {
		return {message: t(`errors.${name}.${type}`)}
	}
}
