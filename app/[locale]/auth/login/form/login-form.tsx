'use client'

import {valibotResolver} from '@hookform/resolvers/valibot'
import {useTranslations} from 'next-intl'
import {Controller, useForm} from 'react-hook-form'
import {FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {toast} from 'sonner'
import {Button} from '@/components/ui/button'
import {Field, FieldError, FieldGroup, FieldLabel} from '@/components/ui/field'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {PAGES} from '@/constants'
import {intlError} from '@/utils/intl-error'
import {formSchema, type FormSchema} from './login-form.schema'
import {useLogin} from '@/features/auth/queries/login'
import {useRouter} from '@/i18n/navigation'

export const LoginForm = () => {
	const t = useTranslations('Auth.LoginPage.Form')
	const {mutate: login, isPending} = useLogin(t)
	const router = useRouter()

	const form = useForm<FormSchema>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const {control, handleSubmit} = form

	const onSubmit = async (data: FormSchema) => {
		login(data, {
			onSuccess: () => {
				router.push(PAGES.MAIN)
				toast.success('Successfully logged in')
			}
		})
	}

	return (
		<form
			className={'space-y-5 md:max-w-md md:space-y-6'}
			id={'login-form'}
			onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup className={'gap-4'}>
				<Controller
					name={'email'}
					control={control}
					render={({field, fieldState}) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor={'login-form-email'}
								className={'leading-none'}>
								{t('email')}
							</FieldLabel>
							<Input
								{...field}
								id={'login-form-email'}
								autoComplete={'email'}
								placeholder={'yourmail@gmail.com'}
								aria-label={t('email')}
								aria-invalid={fieldState.invalid}
								className={'h-11 sm:h-12'}
							/>
							{fieldState.invalid && (
								<FieldError errors={[intlError(t, field.name, fieldState.error?.type)]} />
							)}
						</Field>
					)}
				/>

				<Controller
					name={'password'}
					control={control}
					render={({field, fieldState}) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor={'login-form-password'}
								className={'leading-none'}>
								{t('password')}
							</FieldLabel>
							<Input
								{...field}
								id={'login-form-password'}
								autoComplete={'new-password'}
								placeholder={'YourHa%dPa$$word'}
								type={'password'}
								aria-label={t('password')}
								aria-invalid={fieldState.invalid}
								className={'h-11 sm:h-12'}
							/>
							{fieldState.invalid && (
								<FieldError errors={[intlError(t, field.name, fieldState.error?.type)]} />
							)}
						</Field>
					)}
				/>

				<Button
					isLoading={!!isPending}
					type={'submit'}
					className={'mt-4 h-11 w-full sm:h-12 md:mt-4'}>
					{t('signin')}
				</Button>
			</FieldGroup>

			<div className={'flex items-center gap-4 md:max-w-md'}>
				<Separator className={'flex-1'} />
				<span className={'text-muted-foreground text-xs tracking-wider uppercase sm:text-sm'}>
					{t('orSignInWith')}
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
					<span className={'hidden md:inline'}>{t('signInWithGoogle')}</span>
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
					<span className={'hidden md:inline'}>{t('signInWithFacebook')}</span>
				</Button>
			</div>
		</form>
	)
}
