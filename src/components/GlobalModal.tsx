import * as React from "react"
import { Dialog } from "@mui/material"
import useModal from "../hooks/useModal"

export default function Modal() {
  const { modal, closeModal } = useModal()

  return (
    <Dialog onClose={closeModal} open={!!modal}>
      {modal}
    </Dialog>
  )
}
