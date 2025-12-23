import {hasLocale} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import type {Children, NextProps} from '@/types'
import {getCurrentYear} from '@/utils'
import {routing} from '@/i18n/routing'
import AuthBg from '@/public/auth-bg.webp'

export function generateStaticParams() {
	return routing.locales.map(locale => ({locale}))
}

export default async function AuthLayout({params, children}: NextProps & Children) {
	const {locale} = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}
	setRequestLocale(locale)
	const t = await getTranslations('Auth')

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
				<div
					className={
						'order-2 flex flex-col gap-y-3 justify-self-center px-6 py-8 sm:px-8 md:order-1 md:p-12'
					}>
					{children}
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
