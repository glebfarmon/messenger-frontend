import {useQuery} from '@tanstack/react-query'
import {axios} from '@/utils'
import type {VerifyEmailPayload} from '@/features/auth/model/verify-email'

const verifyEmailQuery = async (data: VerifyEmailPayload) => {
	const response = await axios.get('/auth/verify-email', {params: {token: data.token}})
	return response.data
}

export const useVerifyEmail = (token: string) => {
	return useQuery({
		queryKey: ['verifyEmail', token],
		queryFn: () => verifyEmailQuery({token}),
		enabled: !!token
	})
}
