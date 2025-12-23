'use client'

import {useClickAway} from '@uidotdev/usehooks'
import {useKeyPress} from 'ahooks'
import {useTranslations} from 'next-intl'
import {type ReactNode, useMemo} from 'react'
import {IoClose} from 'react-icons/io5'
import {Button} from '@/components/ui/button'
import type {Children} from '@/types'
import {useModalStore} from '@/store/modal'
import {useBlockScroll, useCloseModal} from '@/hooks'
import {cn} from '@/utils'
import type {ModalId} from './model/modal'

const Modal = ({id, children}: Children & ModalId) => {
	const {modals, closeModal} = useModalStore()
	const isActive = useMemo(() => modals.at(-1)?.id === id, [modals, id])
	const {isOpen, closeModalHandler} = useCloseModal(() => closeModal(), isActive)

	const ref = useClickAway<HTMLDivElement>((e: Event) => {
		const target = e.target as HTMLElement
		//if select menu is opened dismiss
		if (target.closest('[role="option"]') !== null) return

		closeModalHandler()
	})

	useKeyPress('ESC', closeModalHandler)
	useBlockScroll()

	return (
		<div
			className={cn(
				'modal-layout fixed top-0 left-0 z-10 size-full overflow-auto bg-black/30 backdrop-blur-sm',
				!isOpen && 'exit'
			)}>
			<div className={'mt-2 flex justify-center sm:mt-8'}>
				<div
					ref={ref}
					className={cn(
						'modal bg-muted text-foreground relative m-3 flex min-h-75 w-full flex-col rounded-md p-5 shadow-lg sm:w-auto sm:min-w-125 md:min-w-160 lg:max-w-[60%] lg:min-w-185',
						!isOpen && 'exit'
					)}>
					<IoClose
						className={
							'hover:fill-foreground/85 absolute top-0 right-0 m-2 cursor-pointer transition-colors'
						}
						size={34}
						onClick={closeModalHandler}
					/>
					{children}
				</div>
			</div>
		</div>
	)
}

const ModalHeader = ({children}: Children) => {
	return <div className={'mr-8 mb-6 block text-3xl font-bold sm:mr-0'}>{children}</div>
}

const ModalBody = ({children}: Children) => {
	return <div className={'block'}>{children}</div>
}

const ModalFooter = ({
	children,
	closeHandler
}: {
	children?: ReactNode
	closeHandler: () => void
}) => {
	const t = useTranslations('Global.Form')

	return (
		<div className={'mt-auto ml-auto'}>
			<Button
				onClick={closeHandler}
				size={'lg'}
				variant={'outline'}>
				{t('close')}
			</Button>
			{children}
		</div>
	)
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
