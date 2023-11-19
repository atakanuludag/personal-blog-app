"use client";

// ** mui
import Popover from "@mui/material/Popover";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";

export default function PopoverComponent() {
  const { popover, handlePopoverClose } = useComponentContext();
  const { open, anchorEl, content } = popover;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {content}
    </Popover>
  );
}
