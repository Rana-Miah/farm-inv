import { ALERT_MODAL_TYPE, MODAL_TYPE } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BasePayload = {
    id: string;
    description: string;
}

type UpdatePayload = {
    type: typeof ALERT_MODAL_TYPE.SCANNED_ITEM.UPDATE;
    quantity: string;
    previousQuantity: string;
    uom: string;
}
type DeletePayload = {
    type: typeof ALERT_MODAL_TYPE.SCANNED_ITEM.DELETE;
    quantity?: never;
    uom?: string;
    previousQuantity?: string;
}

export type Payload = BasePayload & (UpdatePayload | DeletePayload)



export type AlertModalWithPayloadState = {
    isAlertOpenWithPayload: boolean;
    payload: Payload | null
}

const initialState: AlertModalWithPayloadState = {
    isAlertOpenWithPayload: false,
    payload: null
}

export const alertModalWithPayloadSlice = createSlice({
    name: 'alert-modal-with-payload-slice',
    initialState,
    reducers: {
        onOpen: (state, action: PayloadAction<Payload>) => {
            state.isAlertOpenWithPayload = true;
            state.payload = action.payload
        },
        onClose: (state) => {
            state.isAlertOpenWithPayload = false;
            state.payload = null
        }
    }
})

const alertModalWithPayloadReducer = alertModalWithPayloadSlice.reducer

export const alertModalWithPayloadAction = alertModalWithPayloadSlice.actions

export default alertModalWithPayloadReducer