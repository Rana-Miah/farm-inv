import { AlertModalType } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type AlertModalState = {
    isAlertOpen: boolean;
    alertType: AlertModalType | null
}

const initialState: AlertModalState = {
    isAlertOpen: false,
    alertType: null
}

export const alertModalSlice = createSlice({
    name: 'alert-modal-slice',
    initialState,
    reducers: {
        onOpen: (state, action: PayloadAction<AlertModalType>) => {
            state.isAlertOpen = true;
            state.alertType = action.payload
        },
        onClose: (state) => {
            state.isAlertOpen = false;
            state.alertType = null
        }
    }
})

const alertModalReducer = alertModalSlice.reducer

export const alertModalAction = alertModalSlice.actions

export default alertModalReducer