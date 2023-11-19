"use client";

// ** react
import { createContext, ReactNode, useState } from "react";

// ** mui
import { PopoverVirtualElement } from "@mui/material/Popover";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string | JSX.Element;
  handleConfirmFunction: () => void;
  maxWidth?: false | any | undefined;
  data?: any;
};

type FormDrawerProps = {
  open: boolean;
  title: string;
  content: JSX.Element | null;
  submitLoading?: boolean;
  submitDisabled?: boolean;
  submitButtonText?: string;
  submit?: boolean;
};

type PopoverProps = {
  open: boolean;
  anchorEl:
    | Element
    | (() => Element)
    | PopoverVirtualElement
    | (() => PopoverVirtualElement)
    | null
    | undefined;
  content: JSX.Element;
};

export type ComponentModelContextProps = {
  formDrawer: FormDrawerProps;
  setFormDrawerData: (data: FormDrawerProps) => void;
  handleFormDrawerClose: () => void;
  confirmDialog: ConfirmDialogProps;
  setConfirmDialogData: (data: ConfirmDialogProps) => void;
  handleConfirmDialogClose: () => void;
  popover: PopoverProps;
  setPopoverData: (data: PopoverProps) => void;
  handlePopoverClose: () => void;
};

const initialConfirmDialogData: ConfirmDialogProps = {
  open: false,
  title: "",
  content: "",
  handleConfirmFunction: () => {},
  data: null,
};

const initialFormDrawerData: FormDrawerProps = {
  open: false,
  title: "",
  content: null,
  submitLoading: false,
  submitDisabled: false,
  submitButtonText: "Kaydet",
  submit: false,
};

const initialPopoverData: PopoverProps = {
  open: false,
  anchorEl: null,
  content: <></>,
};

export const ComponentContext = createContext<ComponentModelContextProps>({
  formDrawer: initialFormDrawerData,
  setFormDrawerData: () => {},
  handleFormDrawerClose: () => {},
  confirmDialog: initialConfirmDialogData,
  setConfirmDialogData: () => {},
  handleConfirmDialogClose: () => {},
  setPopoverData: () => {},
  popover: initialPopoverData,
  handlePopoverClose: () => {},
});

const ComponentProvider = ({ children }: { children: ReactNode }) => {
  const [formDrawer, setFormDrawer] = useState<FormDrawerProps>(
    initialFormDrawerData
  );
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogProps>(
    initialConfirmDialogData
  );

  const [popover, setPopover] = useState<PopoverProps>(initialPopoverData);

  const setFormDrawerData = (data: FormDrawerProps) => setFormDrawer(data);

  const handleFormDrawerClose = () => {
    setFormDrawer({
      ...initialFormDrawerData,
      open: false,
    });
    setTimeout(() => setFormDrawer(initialFormDrawerData), 500);
  };

  const setConfirmDialogData = (data: ConfirmDialogProps) =>
    setConfirmDialog(data);

  const handleConfirmDialogClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    });
    setTimeout(() => setConfirmDialogData(initialConfirmDialogData), 500);
  };

  const setPopoverData = (data: PopoverProps) => setPopover(data);

  const handlePopoverClose = () => setPopover(initialPopoverData);

  return (
    <ComponentContext.Provider
      value={{
        formDrawer,
        setFormDrawerData,
        handleFormDrawerClose,
        confirmDialog,
        setConfirmDialogData,
        handleConfirmDialogClose,
        popover,
        setPopoverData,
        handlePopoverClose,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;
