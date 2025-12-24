'use client'

import {useTranslations} from 'next-intl'
import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {useResendEmail} from '@/features/auth/queries/resend-email'

export const ResendCard = ({token}: {token?: string}) => {
	const t = useTranslations('Auth.EmailVerificationPage.resend')
	const {mutate: resend} = useResendEmail(t)

	return (
		<div className={'mx-auto max-w-md'}>
			<div className={'flex flex-col space-y-4'}>
				<h1 className={'text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl'}>
					{t('title')}
				</h1>
				<p className={'text-muted-foreground text-sm leading-relaxed sm:text-base'}>
					{t('description')}
				</p>
				<Button
					size={'lg'}
					className={'mt-2 h-11 px-20 sm:h-12 md:mt-4'}
					onClick={() => {
						resend(
							{token: token ?? ''},
							{
								onSuccess: () => {
									toast(t('success.title'), {
										description: t('success.description')
									})
								}
							}
						)
					}}>
					{t('button')}
				</Button>
				<p className={'text-muted-foreground/70 text-xs sm:text-sm'}>{t('help')}</p>
			</div>
		</div>
	)
}
