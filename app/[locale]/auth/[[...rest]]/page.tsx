import {setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {PAGES} from '@/constants'
import type {NextProps} from '@/types'
import {redirect} from '@/i18n/navigation'

const CatchAll = ({params}: NextProps) => {
	const {locale} = use(params)
	setRequestLocale(locale)

	return redirect({href: PAGES.LOGIN, locale})
}

export default CatchAll
