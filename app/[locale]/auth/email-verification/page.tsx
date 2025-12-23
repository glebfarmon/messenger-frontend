import {getTranslations, setRequestLocale} from 'next-intl/server'
import type {NextProps} from '@/types'
import {VerificationCard} from './verification-card'

type SearchParams = {
	searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export const generateMetadata = async ({params}: NextProps) => {
	const {locale} = await params
	const t = await getTranslations({locale, namespace: 'Auth.EmailVerificationPage'})

	return {
		title: t('pageTitle')
	}
}

const EmailVerificationPage = async ({params, searchParams}: NextProps & SearchParams) => {
	const {locale} = await params
	const {token} = await searchParams
	setRequestLocale(locale)

	return (
		<div className={'flex h-full flex-1 flex-col justify-center md:flex-initial'}>
			<VerificationCard token={token as string | undefined} />
		</div>
	)
}

export default EmailVerificationPage
