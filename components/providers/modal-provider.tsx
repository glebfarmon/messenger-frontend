'use client'

import {type ReactNode} from 'react'
import {useModalStore} from '@/store/modal'
import {ModalManager, Modals} from '@/features/modal/services/manager'

export const ModalProvider = ({children}: {children: ReactNode}) => {
	const {modals} = useModalStore()

	return (
		<>
			{children}
			{typeof window !== 'undefined' && modals.length
				? modals.map(({id, component, props}) => {
						const Component = ModalManager[Modals[component]]
						return (
							<Component
								id={id}
								key={id}
								{...(props ?? {})}
							/>
						)
					})
				: null}
		</>
	)
}
