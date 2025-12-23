import {memo} from 'react'
import {useModalStore} from '@/store/modal'
import Modal from '@/features/modal'
import type {ModalId} from '@/features/modal/model/modal'

const VerifyEmailMemo = ({id}: ModalId) => {
	const closeModal = useModalStore(state => state.closeModal)

	return (
		<Modal id={id}>
			<Modal.Header>
				<p></p>
			</Modal.Header>
			<Modal.Body>
				<p></p>
			</Modal.Body>
			<Modal.Footer closeHandler={closeModal} />
		</Modal>
	)
}

VerifyEmailMemo.displayName = 'VerifyEmail'

export const VerifyEmail = memo(VerifyEmailMemo)
