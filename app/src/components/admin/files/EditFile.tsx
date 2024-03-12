// ** react
import { useEffect, useState } from "react";

// ** next
import Image from "next/image";

// ** mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// ** third party
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

// ** models
import FileModel, { FileForm } from "@/models/FileModel";

// ** services
import FileService from "@/services/FileService";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";
import FetchError from "@/utils/fetchError";

// ** config
import { QUERY_NAMES } from "@/config";

type EditFileProps = {
  data: FileModel;
  isFolder: boolean;
};

export default function EditFile({ data, isFolder }: EditFileProps) {
  const { formDrawer, handleFormDrawerClose, setFormDrawerData } =
    useComponentContext();
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [initialValues, setInitialValues] = useState<FileForm>({
    _id: "",
    title: "",
    description: "",
  });

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Zorunlu alan"),
    // description: Yup.string().optional()
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setValues,
    isValid,
  } = useFormik<FileForm>({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        FileService.patchItem(values);
        enqueueSnackbar(`Dosya başarıyla güncellendi.`, {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_NAMES.FILES],
        });
      } catch (err) {
        fetchErrorSnackbar(err as FetchError);
      }
      handleFormDrawerClose();
      setSubmitting(false);
      resetForm();
    },
  });

  useEffect(() => {
    if (!data) return;
    setInitialValues(data);
    setValues(data);
  }, [data]);

  useEffect(() => {
    setFormDrawerData({
      ...formDrawer,
      submitDisabled: !isValid,
    });
  }, [isValid]);

  useEffect(() => {
    if (formDrawer.submit) handleSubmit();
  }, [formDrawer.submit]);
  return (
    <Stack spacing={2}>
      <Box position="relative" width="100%" height="300px">
        <Image
          fill
          loading="lazy"
          src={generateFileUrl(data)}
          alt={data.title}
        />
      </Box>

      <TextField
        fullWidth
        required
        label="Başlık"
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        {...getFieldProps("title")}
        helperText={errors.title && touched.title ? errors.title : null}
        error={errors.title ? touched.title : false}
      />

      {!isFolder && (
        <TextField
          fullWidth
          required
          multiline
          rows={2}
          label="Açıklama"
          variant="outlined"
          size="small"
          disabled={isSubmitting}
          {...getFieldProps("description")}
          helperText={
            errors.description && touched.title ? errors.description : null
          }
          error={errors.description ? touched.description : false}
        />
      )}

      <Typography variant="body2">
        Güncelleme işlemlerinde dizindeki klasör yolu, ismi veya dosya adı
        değişmez.
      </Typography>
    </Stack>
  );
}
