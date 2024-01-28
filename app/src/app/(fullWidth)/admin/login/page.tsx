"use client";

// ** next
import { useSearchParams, useRouter } from "next/navigation";

// ** third party
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

// ** mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// ** models
import LoginFormModel from "@/models/LoginFormModel";

// ** services
import NextService from "@/services/NextService";

// ** utils
import FetchError from "@/utils/fetchError";

// ** hooks
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

const LoginBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(5),
  width: "100%",
  maxWidth: "360px",
  display: "flex",
  justifyContent: "center",
}));

const Form = styled("form")(() => ({
  width: "100%",
}));

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: LoginFormModel = {
    username: "",
    password: "",
  };

  // form validate
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Lütfen kullanıcı adını giriniz."),
    password: Yup.string().required("Lütfen şifrenizi giriniz."),
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } =
    useFormik<LoginFormModel>({
      initialValues,
      validationSchema,
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        const redirectUrl = searchParams.get("redirectUrl") as string;
        try {
          await NextService.login(values);
          enqueueSnackbar("Başarıyla giriş yapıldı.", {
            variant: "success",
          });
          router.push(redirectUrl ?? "/admin");
        } catch (err) {
          fetchErrorSnackbar(err as FetchError);
        }
        setSubmitting(false);
        resetForm();
      },
    });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={"100%"}
    >
      <LoginBox elevation={5}>
        <Form method="post" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight="100"
              gutterBottom
            >
              Giriş Yap
            </Typography>
            <TextField
              fullWidth
              required
              size="small"
              label="Kullanıcı Adı"
              variant="outlined"
              disabled={isSubmitting}
              {...getFieldProps("username")}
              helperText={
                errors.username && touched.username ? errors.username : null
              }
              error={errors.username ? touched.username : false}
            />

            <TextField
              fullWidth
              required
              size="small"
              type="password"
              label="Şifre"
              variant="outlined"
              disabled={isSubmitting}
              {...getFieldProps("password")}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              error={errors.password ? touched.password : false}
            />

            <LoadingButton
              loading={isSubmitting}
              variant="contained"
              type="submit"
            >
              Giriş
            </LoadingButton>
          </Stack>
        </Form>
      </LoginBox>
    </Box>
  );
}
