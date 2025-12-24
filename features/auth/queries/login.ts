import {useMutation} from '@tanstack/react-query'
import type {TProp} from '@/types'
import {axios, handleAuthError} from '@/utils'
import type {LoginPayload} from '@/features/auth/model/login'

const loginMutation = async (data: LoginPayload) => {
	const response = await axios.post('/auth/sign-in/email', data)
	return response.data
}

export const useLogin = (t: TProp) => {
	return useMutation({
		mutationFn: loginMutation,
		onError: handleAuthError(t)
	})
}
