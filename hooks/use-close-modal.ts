import {useCallback, useState} from 'react'

export const useCloseModal = (closeHandler: () => void, isActive: boolean) => {
	const [isOpen, setOpen] = useState(true)
	const closeModalHandler = useCallback(() => {
		if (!isActive) return

		setOpen(false)
		setTimeout(() => {
			closeHandler()
		}, 300)
	}, [isActive, closeHandler])

	return {isOpen, closeModalHandler}
}
