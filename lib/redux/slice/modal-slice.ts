import { MODAL_TYPE } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalType = keyof typeof MODAL_TYPE | null

export type ModalState = {
    isOpen: boolean;
    type: ModalType
}

const initialState: ModalState = {
    isOpen: false,
    type: null
}

export const modalSlice = createSlice({
    name: 'modal-slice',
    initialState,
    reducers: {
        onOpen: (state, action: PayloadAction<ModalType>) => {
            state.isOpen = true;
            state.type = action.payload
        },
        onClose: (state) => {
            state.isOpen = false;
            state.type = null
        }
    }
})

const modalReducer = modalSlice.reducer

export const modalAction = modalSlice.actions

export default modalReducer