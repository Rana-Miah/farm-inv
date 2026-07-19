import { modalAction } from "@/lib/redux/slice/modal-slice"
import { useAppDispatch, useAppSelector } from "."
import { AlertModalType, ModalType } from "@/constants"
import { alertModalAction } from "@/lib/redux/slice/alert-modal-slice"
import { alertModalWithPayloadAction, Payload } from "@/lib/redux/slice/alert-modal-with-payload"

export const useAlertModalAction = () => {
    const dispatch = useAppDispatch()
    const onAlertOpen = (type: AlertModalType) => dispatch(alertModalAction.onOpen(type))
    const onAlertClose = () => dispatch(alertModalAction.onClose())
    return { onAlertOpen, onAlertClose }
}

export const useAlertModal = () => useAppSelector(state => state.alertModal)

export const useAlertModalActionWithPayload = () => {
    const dispatch = useAppDispatch()
    const onAlertOpenWithPayload = (payload: Payload) => dispatch(alertModalWithPayloadAction.onOpen(payload))
    const onAlertCloseWithPayload = () => dispatch(alertModalWithPayloadAction.onClose())
    return { onAlertOpenWithPayload, onAlertCloseWithPayload }
}

export const useAlertModalWithPayload = () => useAppSelector(state => state.alertModalWithPayload)