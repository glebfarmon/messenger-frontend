'use client'

import {useTranslations} from 'next-intl'
import {useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {PAGES} from '@/constants'
import {cn} from '@/utils'
import {type Status, STATUS_CONFIG} from './status.config'
import {useVerifyEmail} from '@/features/auth/queries/verify-email'
import {useRouter} from '@/i18n/navigation'

export const VerificationCard = ({token}: {token?: string}) => {
	const router = useRouter()
	const t = useTranslations('Auth.EmailVerificationPage')

	const {data, error, isLoading} = useVerifyEmail(token ?? '')
	const status: Status = isLoading ? 'loading' : error || !data ? 'error' : 'success'

	useEffect(() => {
		if (status === 'success') {
			const redirectUser = setTimeout(() => {
				router.push(PAGES.LOGIN)
			}, 5000)

			return () => clearTimeout(redirectUser)
		}
	}, [status, router])

	const {
		icon: Icon,
		iconClassName,
		emoji,
		titleKey,
		descriptionKey,
		buttonDisabled
	} = STATUS_CONFIG[status]

	return (
		<div className={'mx-auto max-w-md'}>
			<div className={'flex flex-col items-center gap-y-6 text-center'}>
				<div
					className={
						'bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20'
					}>
					<Icon className={cn('text-primary h-8 w-8 sm:h-10 sm:w-10', iconClassName)} />
				</div>
				<div className={'space-y-2'}>
					<h1 className={'text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl'}>
						{t(titleKey)}
					</h1>
					<p className={'text-muted-foreground text-sm leading-relaxed sm:text-base'}>
						{t(descriptionKey)}
					</p>
				</div>

				<div className={'bg-primary/10 rounded-2xl p-6'}>
					<div className={'flex justify-center'}>
						<div className={'bg-background rounded-full p-4'}>
							<span className={'text-7xl'}>{emoji}</span>
						</div>
					</div>
				</div>
				<Button
					disabled={buttonDisabled}
					size={'lg'}
					className={'h-11 px-20 sm:h-12'}
					onClick={() => {
						router.push(PAGES.LOGIN)
					}}>
					{t('button')}
				</Button>
			</div>
		</div>
	)
}
