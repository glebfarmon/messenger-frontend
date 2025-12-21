import {useMutation} from '@tanstack/react-query'
import type {TProp} from '@/types'
import {axios, handleAuthError} from '@/utils'
import type {RegisterPayload} from '@/features/auth/model/register'

const registerMutation = async (data: RegisterPayload) => {
	const response = await axios.post('/auth/sign-up/email', data)
	return response
}

export const useRegister = (t: TProp) => {
	return useMutation({
		mutationFn: registerMutation,
		onError: handleAuthError(t)
	})
}
