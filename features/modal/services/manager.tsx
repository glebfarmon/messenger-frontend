import dynamic from 'next/dynamic'
import type {ComponentType} from 'react'
import type {ModalId} from '@/features/modal/model/modal'
import {LoadingCursor} from '@/features/modal/services/loading-cursor'

export enum Modals {
	VerifyEmail
}

export const ModalManager: Record<Modals, ComponentType<ModalId & unknown>> = {
	[Modals.VerifyEmail]: dynamic(
		() => import('@/components/modals/auth/temp').then(mod => mod.VerifyEmail),
		{
			ssr: false,
			loading: () => <LoadingCursor />
		}
	)
}
