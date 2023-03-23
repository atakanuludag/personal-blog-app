// ** react
import { createContext, ReactNode, useState } from 'react'

type ConfirmDialogProps = {
  open: boolean
  title: string
  content: string
  handleConfirmFunction: () => void
}

type FormDrawerProps = {
  open: boolean
  title: string
  content: JSX.Element | null
  submitLoading?: boolean
  submitDisabled?: boolean
  submitButtonText?: string
  submit?: boolean
}

export type ComponentModelContextProps = {
  formDrawer: FormDrawerProps
  setFormDrawerData: (data: FormDrawerProps) => void
  handleFormDrawerClose: () => void
  confirmDialog: ConfirmDialogProps
  setConfirmDialogData: (data: ConfirmDialogProps) => void
  handleConfirmDialogClose: () => void
}

const initialConfirmDialogData: ConfirmDialogProps = {
  open: false,
  title: '',
  content: '',
  handleConfirmFunction: () => {},
}

const initialFormDrawerData: FormDrawerProps = {
  open: false,
  title: '',
  content: null,
  submitLoading: false,
  submitDisabled: false,
  submitButtonText: 'Kaydet',
  submit: false,
}

export const ComponentContext = createContext<ComponentModelContextProps>({
  formDrawer: initialFormDrawerData,
  setFormDrawerData: () => {},
  handleFormDrawerClose: () => {},
  confirmDialog: initialConfirmDialogData,
  setConfirmDialogData: () => {},
  handleConfirmDialogClose: () => {},
})

const ComponentProvider = ({ children }: { children: ReactNode }) => {
  const [formDrawer, setFormDrawer] = useState<FormDrawerProps>(
    initialFormDrawerData,
  )
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogProps>(
    initialConfirmDialogData,
  )

  const setFormDrawerData = (data: FormDrawerProps) => setFormDrawer(data)

  const handleFormDrawerClose = () => {
    setFormDrawer({
      ...initialFormDrawerData,
      open: false,
    })
    setTimeout(() => setFormDrawer(initialFormDrawerData), 500)
  }

  const setConfirmDialogData = (data: ConfirmDialogProps) =>
    setConfirmDialog(data)

  const handleConfirmDialogClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    })
    setTimeout(() => setConfirmDialogData(initialConfirmDialogData), 500)
  }

  return (
    <ComponentContext.Provider
      value={{
        formDrawer,
        setFormDrawerData,
        handleFormDrawerClose,
        confirmDialog,
        setConfirmDialogData,
        handleConfirmDialogClose,
      }}
    >
      {children}
    </ComponentContext.Provider>
  )
}

export default ComponentProvider
