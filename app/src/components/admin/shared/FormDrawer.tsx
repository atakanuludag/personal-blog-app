"use client";

// ** mui
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";

// ** icons
import CloseIcon from "@mui/icons-material/Close";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";

const StyledActionButtons = styled(Box)(({}) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  padding: 10,
}));

export default function FormDrawer() {
  const { formDrawer, handleFormDrawerClose, setFormDrawerData } =
    useComponentContext();

  const {
    open,
    content,
    title,
    submitLoading,
    submitDisabled,
    submitButtonText,
  } = formDrawer;

  const handleClose = () => {
    if (submitLoading) return;
    handleFormDrawerClose();
  };

  const handleSubmit = () => {
    setFormDrawerData({
      ...formDrawer,
      submit: true,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      sx={{ overflow: "hidden", zIndex: (theme) => theme.zIndex.drawer + 2 }}
    >
      <Box minWidth="20vw" maxWidth="20vw" height="100%" position="relative">
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleClose} disabled={submitLoading}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box paddingLeft={3} paddingRight={3} paddingBottom={3}>
          <Typography variant="h5" fontWeight="600">
            {title}
          </Typography>
        </Box>

        <Box
          overflow="auto"
          height="89vh"
          paddingTop={1}
          paddingLeft={3}
          paddingRight={3}
        >
          {content}
        </Box>

        <StyledActionButtons>
          <LoadingButton
            size="large"
            variant="contained"
            onClick={handleSubmit}
            loading={submitLoading}
            disabled={submitDisabled}
            fullWidth
          >
            {submitButtonText?.toLocaleUpperCase()}
          </LoadingButton>
        </StyledActionButtons>
      </Box>
    </Drawer>
  );
}
