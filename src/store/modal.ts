import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."

export interface ModalState {
  component: JSX.Element | null
}

const initialState: ModalState = {
  component: null,
}

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<JSX.Element>) {
      state.component = action.payload
    },
    closeModal(state) {
      state.component = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const getModalComponent = (state: RootState) => state.modal.component

export default modalSlice.reducer
