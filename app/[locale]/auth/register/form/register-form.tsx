'use client'

import {valibotResolver} from '@hookform/resolvers/valibot'
import {useTranslations} from 'next-intl'
import {Controller, useForm} from 'react-hook-form'
import {FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import {Button} from '@/components/ui/button'
import {Field, FieldError, FieldGroup, FieldLabel} from '@/components/ui/field'
import {Input} from '@/components/ui/input'
import {Separator} from '@/components/ui/separator'
import {intlError} from '@/utils/intl-error'
import {formSchema, type FormSchema} from './register-form.schema'

export const RegisterForm = () => {
	const t = useTranslations('Auth.RegisterPage.Form')

	const form = useForm<FormSchema>({
		resolver: valibotResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})
	const {control, handleSubmit} = form

	const onSubmit = async (data: FormSchema) => {
		console.log('hello', data)
	}

	return (
		<form
			className={'space-y-5 md:max-w-md md:space-y-6'}
			id={'register-form'}
			onSubmit={handleSubmit(onSubmit)}>
			<FieldGroup className={'gap-4'}>
				<Controller
					name={'name'}
					control={control}
					render={({field, fieldState}) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor={'register-form-name'}
								className={'leading-none'}>
								{t('name')}
							</FieldLabel>
							<Input
								{...field}
								id={'register-form-name'}
								autoComplete={'name'}
								placeholder={'John Smith'}
								aria-label={t('name')}
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
					name={'email'}
					control={control}
					render={({field, fieldState}) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel
								htmlFor={'register-form-email'}
								className={'leading-none'}>
								{t('email')}
							</FieldLabel>
							<Input
								{...field}
								id={'register-form-email'}
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
								htmlFor={'register-form-password'}
								className={'leading-none'}>
								{t('password')}
							</FieldLabel>
							<Input
								{...field}
								id={'register-form-password'}
								autoComplete={'new-password'}
								placeholder={'YourHa%dPa$$word'}
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
					type={'submit'}
					className={'mt-4 h-11 w-full sm:h-12 md:mt-4'}>
					{t('signup')}
				</Button>
			</FieldGroup>

			<div className={'flex items-center gap-4 md:max-w-md'}>
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
		</form>
	)
}
