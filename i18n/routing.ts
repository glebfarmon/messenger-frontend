import {defineRouting} from 'next-intl/routing'

export const locales = ['en', 'pl']

export const routing = defineRouting({
	locales,

	defaultLocale: locales[0],

	localePrefix: 'as-needed'
})
