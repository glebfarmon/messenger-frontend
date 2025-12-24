import {useMutation} from '@tanstack/react-query'
import type {TProp} from '@/types'
import {axios, handleAuthError} from '@/utils'
import type {ResendEmailPayload} from '@/features/auth/model/resend-email'

const resendEmailMutation = async (data: ResendEmailPayload) => {
	const response = await axios.post(`/mail/resend/verify-email/${encodeURIComponent(data.token)}`)
	return response.data
}

export const useResendEmail = (t: TProp) => {
	return useMutation({
		mutationFn: resendEmailMutation,
		onError: handleAuthError(t)
	})
}
