import {useTranslations} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import {PAGES} from '@/constants'
import type {NextProps} from '@/types'
import {RegisterForm} from './form/register-form'
import {Link} from '@/i18n/navigation'

export const generateMetadata = async ({params}: NextProps) => {
	const {locale} = await params
	const t = await getTranslations({locale, namespace: 'Auth.RegisterPage'})

	return {
		title: t('pageTitle')
	}
}

const RegisterPage = ({params}: NextProps) => {
	const {locale} = use(params)
	setRequestLocale(locale)
	const t = useTranslations('Auth.RegisterPage')

	return (
		<div className={'flex h-full flex-1 flex-col justify-center md:flex-initial'}>
			<div className={'mb-4 md:mb-6 lg:mb-8'}>
				<h1 className={'mb-2 text-2xl leading-tight font-semibold sm:text-3xl md:mb-3 lg:text-4xl'}>
					{t('title')}
				</h1>
				<p
					className={
						'text-muted-foreground max-w-prose text-sm leading-relaxed text-balance sm:text-base md:max-w-md'
					}>
					{t('description')}
				</p>
			</div>
			<RegisterForm />
			<p className={'text-muted-foreground mt-6 text-center text-sm md:mt-8 md:max-w-md'}>
				{t('alreadyHaveAccount')}{' '}
				<Link
					href={PAGES.LOGIN}
					className={
						'text-primary focus-visible:ring-ring font-medium underline-offset-4 hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
					}>
					{t('Form.signin')}
				</Link>
			</p>
		</div>
	)
}

export default RegisterPage
