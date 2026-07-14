import { modalAction, ModalType } from "@/lib/redux/slice/modal-slice"
import { useAppDispatch, useAppSelector } from "."

export const useModalAction = () => {
    const dispatch = useAppDispatch()
    const onOpen = (type: ModalType) => dispatch(modalAction.onOpen(type))
    const onClose = () => dispatch(modalAction.onClose())
    return { onClose, onOpen }
}

export const useModal = () => useAppSelector(state => state.modal)