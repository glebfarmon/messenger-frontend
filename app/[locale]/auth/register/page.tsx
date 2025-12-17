import {useTranslations} from 'next-intl'
import {getTranslations, setRequestLocale} from 'next-intl/server'
import Image from 'next/image'
import {use} from 'react'
import {FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {PAGES} from '@/constants'
import type {NextProps} from '@/types'
import {getCurrentYear} from '@/utils'
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

				<div className={'order-2 flex flex-col px-6 py-8 sm:px-8 md:order-1 md:p-12'}>
					<div className={'flex flex-1 flex-col md:flex-initial'}>
						<div className={'mb-8 md:mb-10 lg:mb-12'}>
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

						<form className={'space-y-5 md:max-w-md md:space-y-6'}>
							<div className={'space-y-2'}>
								<label
									htmlFor={'email'}
									className={
										'block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									}>
									{t('email')}
								</label>
								<Input
									id={'email'}
									name={'email'}
									type={'email'}
									autoComplete={'email'}
									placeholder={'example@gmail.com'}
									aria-label={t('email')}
									className={'h-11 sm:h-12'}
								/>
							</div>

							<div className={'space-y-2'}>
								<label
									htmlFor={'password'}
									className={
										'block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
									}>
									{t('password')}
								</label>
								<Input
									id={'password'}
									name={'password'}
									type={'password'}
									autoComplete={'new-password'}
									placeholder={'12345678'}
									aria-label={t('password')}
									className={'h-11 sm:h-12'}
								/>
							</div>

							<Button
								type={'submit'}
								className={'mt-4 h-11 w-full sm:h-12 md:mt-4'}>
								{t('signup')}
							</Button>
						</form>

						<div className={'my-6 flex items-center gap-4 md:my-8 md:max-w-md'}>
							<Separator className={'flex-1'} />
							<span className={'text-muted-foreground text-xs tracking-wider uppercase sm:text-sm'}>
								{t('orSignUpWith')}
							</span>
							<Separator className={'flex-1'} />
						</div>

						<div className={'grid grid-cols-2 gap-3 md:max-w-md md:grid-cols-1 md:gap-4'}>
							<Button
								type={'button'}
								variant={'outline'}
								className={'h-11 gap-2 md:h-12'}>
								<FcGoogle
									className={'h-5 w-5 shrink-0'}
									aria-hidden={'true'}
								/>
								<span className={'md:hidden'}>{t('google')}</span>
								<span className={'hidden md:inline'}>{t('signUpWithGoogle')}</span>
							</Button>
							<Button
								type={'button'}
								variant={'outline'}
								className={'h-11 gap-2 md:h-12'}>
								<FaFacebook
									className={'h-5 w-5 shrink-0 text-blue-500'}
									aria-hidden={'true'}
								/>
								<span className={'md:hidden'}>{t('facebook')}</span>
								<span className={'hidden md:inline'}>{t('signUpWithFacebook')}</span>
							</Button>
						</div>

						<p className={'text-muted-foreground mt-6 text-center text-sm md:mt-8 md:max-w-md'}>
							{t('alreadyHaveAccount')}{' '}
							<Link
								href={PAGES.LOGIN}
								className={
									'text-primary focus-visible:ring-ring font-medium underline-offset-4 hover:underline focus-visible:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
								}>
								{t('signin')}
							</Link>
						</p>
					</div>

					<p
						className={'text-muted-foreground mt-auto text-center text-xs tracking-wide uppercase'}>
						© {getCurrentYear()} {t('allRightsReserved')}
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
