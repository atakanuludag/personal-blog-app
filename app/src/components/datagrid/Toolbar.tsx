"use client";

// ** react
import { Dispatch, SetStateAction } from "react";

// ** mui
import { GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// ** third party
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

// ** icons
import DeleteIcon from "@mui/icons-material/Delete";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";

const StyledGridToolbarContainer = styled(GridToolbarContainer)(
  ({ theme }) => ({
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.grey[700],
    padding: 10,
    display: "flex",
    justifyContent: "flex-end",
  })
);

export type MuiToolbarProps = {
  queryName: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  selected: string[];
  deleteService: (id: string) => Promise<unknown>;
  deleteDialogMessage?: string;
};

export default function MuiToolbar({
  queryName,
  loading,
  setLoading,
  selected,
  deleteService,
  deleteDialogMessage,
}: MuiToolbarProps) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { setConfirmDialogData, handleConfirmDialogClose } =
    useComponentContext();

  const handleSelectedConfirmDelete = async () => {
    handleConfirmDialogClose();
    setLoading(true);
    for await (const id of selected) {
      await deleteService(id);
    }
    queryClient.invalidateQueries({
      queryKey: [queryName],
    });
    enqueueSnackbar("Seçtiğiniz kayıtlar başarıyla silindi.", {
      variant: "success",
    });
    setLoading(false);
  };

  const handleSelectedDeleteButton = async () => {
    setConfirmDialogData({
      open: true,
      title: "Emin misiniz ?",
      content:
        deleteDialogMessage || "Seçilenleri silmek için lütfen onaylayın.",
      handleConfirmFunction: handleSelectedConfirmDelete,
    });
  };

  return (
    <StyledGridToolbarContainer>
      <Button
        variant="contained"
        startIcon={<DeleteIcon fontSize="small" />}
        size="small"
        disabled={loading || selected.length <= 0}
        onClick={handleSelectedDeleteButton}
      >
        Seçilenleri sil
      </Button>
    </StyledGridToolbarContainer>
  );
}
