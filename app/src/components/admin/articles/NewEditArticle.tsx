"use client";

// ** react
import { useState, useEffect } from "react";

// ** next
import Image from "next/image";
import { useRouter } from "next/navigation";

// ** third party
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";

// ** mui
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import FormHelperText from "@mui/material/FormHelperText";

// ** icons
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import WarningIcon from "@mui/icons-material/Warning";
import DoneIcon from "@mui/icons-material/Done";

// ** models
import FileModel from "@/models/FileModel";
import { ArticleFormModel } from "@/models/ArticleModel";

// ** utils
import generateFileUrl from "@/utils/GenerateFileUrl";
import slugify from "@/utils/Slugify";
import FetchError from "@/utils/fetchError";

// ** services
import ArticleService from "@/services/ArticleService";

// ** hooks
import useArticleQuery from "@/hooks/queries/useArticleQuery";
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** components
import Editor from "@/components/admin/shared/editor";
import DialogFileBrowser from "@/components/admin/shared/file-browser/DialogFileBrowser";
import TagChipAutocomplete from "@/components/admin/articles/TagChipAutocomplete";
import CategoryTree from "@/components/admin/shared/CategoryTree";
import SkeletonLoading from "@/components/admin/shared/SkeletonLoading";

// ** config
import { QUERY_NAMES } from "@/config";

const CoverImageBox = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  border: `1px dashed ${theme.palette.grey[800]}`,
  height: 250,
  width: "100%",
  "& .MuiSvgIcon-root": {
    fontSize: "50px",
    color: theme.palette.grey[300],
    position: "absolute",
    top: "5vw",
    left: "8vw",
  },
  "&:hover": {
    borderColor: theme.palette.grey[500],
  },
}));
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  paddingBottom: theme.spacing(0.5),
  "& .MuiTypography-root": {
    fontSize: 17,
  },
}));

type NewEditArticleProps = {
  id?: string;
};

export default function NewEditArticle({ id: editId }: NewEditArticleProps) {
  const router = useRouter();
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const { useArticleItemQuery } = useArticleQuery();
  const queryClient = useQueryClient();

  const [id, setId] = useState<string | null>(null);
  const [categoryTreeExpanded, setCategoryTreeExpanded] = useState(
    new Array<string>()
  );
  const [guidExistsLoading, setGuidExistsLoading] = useState(false);
  const [guidExists, setGuidExists] = useState<boolean | null>(null);
  const [selectCoverImage, setSelectCoverImage] = useState({} as FileModel);
  const [imageBrowserOpen, setImageBrowserOpen] = useState(false);

  const [initialValues, setInitialValues] = useState<ArticleFormModel>({
    title: "",
    shortDescription: "",
    content: "",
    guid: "",
    publishingDate: new Date(),
    categories: [],
    tags: [],
    coverImage: null,
    isShow: true,
  });

  const editArticleItem = useArticleItemQuery(id || "", {
    enabled: !id ? false : true,
  });

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Zorunlu alan"),
    shortDescription: Yup.string().required("Zorunlu alan"),
    content: Yup.mixed().required("Zorunlu alan"),
    guid: Yup.string().required("Zorunlu alan"),
    publishingDate: Yup.date().required("Zorunlu alan"),
    categories: Yup.array().min(1, "Zorunlu alan").required("Zorunlu alan"),
    tags: Yup.array().min(1, "Zorunlu alan").required("Zorunlu alan"),
  });

  const handleSelectCoverImage = () => setImageBrowserOpen(true);

  const selectImageConfirm = () => {
    setFieldValue("coverImage", selectCoverImage?._id);
    setImageBrowserOpen(false);
  };

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setValues,
    values,
    isValid,
  } = useFormik<ArticleFormModel>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if (values._id || id) {
          await ArticleService.patchItem(values);
        } else {
          await ArticleService.postItem(values);
        }
        enqueueSnackbar("Makale başarıyla kaydedildi.", {
          variant: "success",
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_NAMES.ARTICLE],
        });
        router.push("/admin/articles");
      } catch (err) {
        fetchErrorSnackbar(err as FetchError);
      }
      setSubmitting(false);
      resetForm();
    },
  });

  useEffect(() => {
    if (!editId) return;
    setId(editId);
  }, [editId]);

  useEffect(() => {
    const data = editArticleItem?.data?.data;

    if (!data) return;

    const categories = data?.categories.map((c) => c._id) ?? [];
    const tags = data?.tags.map((t) => t.title) ?? [];

    const form: ArticleFormModel = {
      ...data,
      categories,
      tags,
      coverImage: data?.coverImage?._id || null,
    };
    if (data?.coverImage) setSelectCoverImage(data.coverImage);
    setCategoryTreeExpanded(categories);
    setInitialValues(form);
    setValues(form);
  }, [editArticleItem.data]);

  useEffect(() => {
    if (values.title !== initialValues.title && !initialValues._id) {
      setFieldValue("guid", slugify(values.title));
    }
  }, [values.title]);

  useEffect(() => {
    if (values._id && initialValues.guid === values.guid) {
      setGuidExistsLoading(false);
      setGuidExists(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (values.guid) {
        setGuidExistsLoading(true);
        const response = await ArticleService.guidExists(values.guid);
        setTimeout(() => {
          setGuidExistsLoading(false);
          setGuidExists(typeof response !== "undefined" ? response : true);
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [values.guid]);

  const handleSelectImageChange = (data: FileModel[]) =>
    setSelectCoverImage(data[data.length - 1]);

  const handleChangeSetContent = (text: string) => {
    setFieldValue("content", text);
  };

  const loading =
    editArticleItem.isLoading || editArticleItem.isRefetching || isSubmitting;

  if (loading) return <SkeletonLoading />;

  return (
    <form method="post" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              type="text"
              id="title"
              label="Başlık"
              variant="outlined"
              size="medium"
              disabled={isSubmitting}
              {...getFieldProps("title")}
              helperText={errors.title && touched.title ? errors.title : null}
              error={errors.title ? touched.title : false}
            />

            <TextField
              required
              fullWidth
              multiline
              type="text"
              id="shortDescription"
              label="Kısa Açıklama"
              variant="outlined"
              size="small"
              disabled={isSubmitting}
              {...getFieldProps("shortDescription")}
              helperText={
                errors.shortDescription && touched.shortDescription
                  ? errors.shortDescription
                  : null
              }
              error={errors.shortDescription ? touched.shortDescription : false}
            />

            <FormControl
              fullWidth
              size="small"
              variant="outlined"
              error={errors.guid ? touched.guid : false}
              required
            >
              <InputLabel htmlFor="guid">Kısa Link</InputLabel>
              <OutlinedInput
                id="guid"
                required
                {...getFieldProps("guid")}
                disabled={isSubmitting || guidExistsLoading}
                endAdornment={
                  <InputAdornment position="end">
                    {guidExistsLoading ? (
                      <CircularProgress size={18} />
                    ) : (
                      guidExists !== null &&
                      (!guidExists ? (
                        <DoneIcon />
                      ) : (
                        <Tooltip
                          title="Eklemeye çalıştığınız guid bilgisi zaten kullanılıyor."
                          placement="top"
                        >
                          <WarningIcon />
                        </Tooltip>
                      ))
                    )}
                  </InputAdornment>
                }
                label="Kısa Link"
              />
              <FormHelperText>
                {errors.guid && touched.guid ? errors.guid : null}
              </FormHelperText>
            </FormControl>

            <Editor value={values.content} setValue={handleChangeSetContent} />
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={2}>
            <Card>
              <StyledCardHeader
                title="Ayarlar"
                action={
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      !isValid || guidExistsLoading || guidExists === true
                    }
                  >
                    YAYINLA
                  </Button>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  <DatePicker
                    label="Tarih"
                    value={new Date(values.publishingDate)}
                    onChange={(date) => setFieldValue("publishingDate", date)}
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />

                  <Box display="flex" justifyContent="flex-end">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.isShow}
                            onChange={(e, checked) =>
                              setFieldValue("isShow", checked)
                            }
                          />
                        }
                        label={values.isShow ? "Aktif" : "Pasif"}
                      />
                    </FormGroup>
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <StyledCardHeader title="Öne Çıkan Görsel" />
              <CardContent>
                <CoverImageBox onClick={handleSelectCoverImage}>
                  {values.coverImage === null ? (
                    <AddPhotoAlternateIcon />
                  ) : (
                    <Image
                      fill
                      src={generateFileUrl(selectCoverImage)}
                      alt=""
                    />
                  )}
                </CoverImageBox>
              </CardContent>
            </Card>

            <Card>
              <StyledCardHeader title="Etiketler" />
              <CardContent>
                <TagChipAutocomplete
                  selected={values.tags}
                  setSelected={(data) => setFieldValue("tags", data)}
                />
              </CardContent>
            </Card>

            <Card>
              <StyledCardHeader title="Kategoriler" />
              <CardContent>
                <CategoryTree
                  expanded={categoryTreeExpanded}
                  selected={values.categories}
                  setSelected={(data) => setFieldValue("categories", data)}
                />
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      <DialogFileBrowser
        enableSelectedFiles
        open={imageBrowserOpen}
        setOpen={setImageBrowserOpen}
        selectedFiles={[selectCoverImage]}
        handleSelectFilesChange={handleSelectImageChange}
        handleConfirmFunction={selectImageConfirm}
      />
    </form>
  );
}
