import {NextIntlClientProvider, useMessages, useTranslations} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import Image from 'next/image'
import {use} from 'react'
import {PAGES} from '@/constants'
import type {NextProps} from '@/types'
import {getCurrentYear, pick} from '@/utils'
import {RegisterForm} from './form/register-form'
import {Link} from '@/i18n/navigation'
import AuthBg from '@/public/auth-bg.webp'

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

	const messages = useMessages()
	const t = useTranslations('Auth.RegisterPage')

	return (
		<div className={'bg-background min-h-screen'}>
			<div className={'flex min-h-screen flex-col md:grid md:grid-cols-2'}>
				<div className={'order-1 p-4 sm:p-6 md:order-2 md:p-8'}>
					<div
						className={
							'relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl md:aspect-auto md:h-full'
						}>
						<Image
							src={AuthBg}
							alt={'authentication background'}
							fill
							sizes={'(max-width: 768px) 100vw, 50vw'}
							className={'object-cover object-top'}
							priority
						/>
					</div>
				</div>

				<div className={'order-2 flex flex-col gap-y-3 px-6 py-8 sm:px-8 md:order-1 md:p-12'}>
					<div className={'flex flex-1 flex-col md:flex-initial'}>
						<div className={'mb-4 md:mb-6 lg:mb-8'}>
							<h1
								className={
									'mb-2 text-2xl leading-tight font-semibold sm:text-3xl md:mb-3 lg:text-4xl'
								}>
								{t('title')}
							</h1>
							<p
								className={
									'text-muted-foreground max-w-prose text-sm leading-relaxed text-balance sm:text-base md:max-w-md'
								}>
								{t('description')}
							</p>
						</div>
						<NextIntlClientProvider messages={pick(messages, 'Auth.RegisterPage.Form')}>
							<RegisterForm />
						</NextIntlClientProvider>

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
					<footer className={'mt-auto'}>
						<p className={'text-muted-foreground text-center text-xs tracking-wide uppercase'}>
							© {getCurrentYear()} {t('allRightsReserved')}
						</p>
					</footer>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
