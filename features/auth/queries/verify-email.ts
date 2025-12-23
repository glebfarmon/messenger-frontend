import {useQuery} from '@tanstack/react-query'
import {axios} from '@/utils'
import type {VerifyEmailPayload} from '@/features/auth/model/verify-email'

const verifyEmail = async (data: VerifyEmailPayload) => {
	const response = await axios.get('/auth/verify-email', {params: {token: data.token}})
	return response
}

export const useVerifyEmail = (token: string) => {
	return useQuery({
		queryKey: ['verifyEmail', token],
		queryFn: () => verifyEmail({token}),
		enabled: !!token
	})
}
