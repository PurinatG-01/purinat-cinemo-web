import { useAppDispatch, useAppSelector } from "../store/hooks"
import { closeModal, getModalComponent, openModal } from "../store/modal"

export default function useModal() {
  const dispatch = useAppDispatch()
  const modalComponent = useAppSelector(getModalComponent)

  const open = (component: JSX.Element) => {
    dispatch(openModal(component))
  }

  const close = () => {
    dispatch(closeModal())
  }

  return { modal: modalComponent, openModal: open, closeModal: close }
}
