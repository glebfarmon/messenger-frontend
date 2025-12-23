import {nanoid} from 'nanoid'
import {create} from 'zustand'
import type {ModalId} from '@/features/modal/model/modal'
import type {Modals} from '@/features/modal/services/manager'

interface PayloadModal {
	component: keyof typeof Modals
	props?: unknown
}

interface Modal extends PayloadModal, ModalId {}

interface ModalStoreState {
	modals: Modal[]
	openModal: (modal: PayloadModal) => void
	closeModal: () => void
	closeAllModals: () => void
}

export const useModalStore = create<ModalStoreState>(set => ({
	modals: [],
	openModal: modal =>
		set(state => ({
			modals: [...state.modals, {id: nanoid(), component: modal.component, props: modal?.props}]
		})),
	closeModal: () =>
		set(state => ({
			modals: state.modals.slice(0, -1)
		})),
	closeAllModals: () => set({modals: []})
}))
