import {Ban, CheckCircle2, Loader} from 'lucide-react'

export type Status = 'error' | 'loading' | 'success'

type StatusConfig = {
	icon: React.ElementType
	iconClassName?: string
	emoji: string
	titleKey: string
	descriptionKey: string
	buttonDisabled: boolean
}

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
	error: {
		icon: Ban,
		emoji: '😿',
		titleKey: 'error.title',
		descriptionKey: 'error.description',
		buttonDisabled: true
	},
	loading: {
		icon: Loader,
		iconClassName: 'animate-spin',
		emoji: '🙉',
		titleKey: 'loading.title',
		descriptionKey: 'loading.description',
		buttonDisabled: true
	},
	success: {
		icon: CheckCircle2,
		emoji: '🎉',
		titleKey: 'success.title',
		descriptionKey: 'success.description',
		buttonDisabled: false
	}
}
