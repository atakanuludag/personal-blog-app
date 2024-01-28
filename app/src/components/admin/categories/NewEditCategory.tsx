"use client";

// ** react
import { SyntheticEvent, useEffect, useState } from "react";

// ** mui
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { AutocompleteChangeReason } from "@mui/material/Autocomplete";

// ** icons
import WarningIcon from "@mui/icons-material/Warning";
import DoneIcon from "@mui/icons-material/Done";

// ** third party
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

// ** models
import CategoryModel, { CategoryFormModel } from "@/models/CategoryModel";
import ListQueryModel from "@/models/ListQueryModel";

// ** services
import CategoryService from "@/services/CategoryService";

// ** hooks
import useComponentContext from "@/hooks/useComponentContext";
import useCategoryQuery from "@/hooks/queries/useCategoryQuery";
import useFetchErrorSnackbar from "@/hooks/useFetchErrorSnackbar";

// ** components
// import AsyncAutocomplete from "@/components/AsyncAutocomplete";
import CategoryTree from "@/components/admin/shared/CategoryTree";

// ** utils
import slugify from "@/utils/Slugify";
import FetchError from "@/utils/fetchError";

// ** config
import { QUERY_NAMES } from "@/config";

type NewEditCategoryProps = {
  data?: CategoryFormModel;
};

export default function NewEditCategory({ data }: NewEditCategoryProps) {
  const { formDrawer, handleFormDrawerClose, setFormDrawerData } =
    useComponentContext();
  const fetchErrorSnackbar = useFetchErrorSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const [parentSearchText, setParentSearchText] = useState("");
  const [parentValue, setParentValue] = useState<CategoryModel | null>(null);
  const [initialValues, setInitialValues] = useState<CategoryFormModel>({
    title: "",
    description: "",
    guid: "",
    parent: null,
    order: 0,
  });

  const [guidExistsLoading, setGuidExistsLoading] = useState(false);
  const [guidExists, setGuidExists] = useState<boolean | null>(null);
  const [parentAutocompleteParams, seParentAutocompleteParams] =
    useState<ListQueryModel>({
      s: "",
      sType: "title",
    });

  const { useCategoriesQuery } = useCategoryQuery(parentAutocompleteParams);
  //const { useCategoriesQuery } = useCategoryQuery(parentAutocompleteParams);
  const categories = useCategoriesQuery(parentSearchText === "" ? false : true);

  // form validate
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Zorunlu alan"),
    description: Yup.string().required("Zorunlu alan"),
    guid: Yup.string().required("Zorunlu alan"),
    parent: Yup.string().optional().nullable(),
    order: Yup.number().optional().nullable(),
  });

  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    setValues,
    isValid,
    values,
  } = useFormik<CategoryFormModel>({
    initialValues,
    validationSchema,
    validateOnMount: data?._id ? false : true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        let text = "";
        const newValues: CategoryFormModel = {
          ...values,
          order: Number(values.order),
        };
        if (newValues._id) {
          await CategoryService.patchItem(newValues);
          text = "Kayıt başarıyla düzenlendi.";
        } else {
          await CategoryService.postItem(newValues);
          text = "Kayıt başarıyla eklendi.";
        }
        enqueueSnackbar(text, {
          variant: "success",
        });
        // queryClient.removeQueries({
        //   queryKey: [QUERY_NAMES.CATEGORY],
        // });
        queryClient.invalidateQueries({
          queryKey: [QUERY_NAMES.CATEGORY],
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
    if (values.title !== initialValues.title && !initialValues._id) {
      setFieldValue("guid", slugify(values.title));
    }
  }, [values.title]);

  useEffect(() => {
    if (!data) return;
    if (data.parent) setParentValue(data.parent as CategoryModel);
    setInitialValues(data);
    setValues({
      ...data,
      parent: (data.parent as CategoryModel)?._id || null,
    });
  }, [data]);

  useEffect(() => {
    setFormDrawerData({
      ...formDrawer,
      submitDisabled: !isValid || guidExistsLoading || guidExists === true,
    });
  }, [isValid, guidExistsLoading, guidExists]);

  useEffect(() => {
    if (formDrawer.submit) handleSubmit();
  }, [formDrawer.submit]);

  useEffect(() => {
    if (values._id && initialValues.guid === values.guid) {
      setGuidExistsLoading(false);
      setGuidExists(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (values.guid) {
        setGuidExistsLoading(true);
        const response = await CategoryService.guidExists(values.guid);
        setTimeout(() => {
          setGuidExistsLoading(false);
          setGuidExists(typeof response !== "undefined" ? response : true);
        }, 500);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [values, initialValues]);

  const handleParentAutoCompleteInputChange = (
    e: any,
    newInputValue: string
  ) => {
    seParentAutocompleteParams({
      ...parentAutocompleteParams,
      s: newInputValue,
    });
    setParentSearchText(newInputValue);
  };

  const handleParentAutoCompleteChange = (
    e: SyntheticEvent<Element, Event>,
    val: CategoryModel,
    reason: AutocompleteChangeReason
  ) => {
    if (reason === "clear") {
      setFieldValue("parent", null);
      setParentValue(null);
      return;
    }
    setFieldValue("parent", val._id);
    setParentValue(val);
  };

  const handleCategoryParentSelected = () => {
    if (!values.parent) return [];
    else if ((values.parent as CategoryModel)?._id) {
      return [(values.parent as CategoryModel)?._id];
    }
    return [values.parent as string];
  };

  //console.log("values.parent ", handleCategoryParentSelected());

  const handleCategoryParentSetSelected = (a: any) => {
    // console.log("a", a);
  };

  return (
    <Stack spacing={2}>
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

      {/* <AsyncAutocomplete
        name="parent"
        value={parentValue}
        inputValue={parentSearchText}
        label="Evebeyn Kategori"
        handleInputChange={handleParentAutoCompleteInputChange}
        handleChange={handleParentAutoCompleteChange}
        data={categories?.data || []}
        objName="title"
        setTouched={setTouched}
        loading={categories.isLoading}
        helperText={errors.parent && touched.parent ? errors.parent : null}
        error={errors.parent ? touched.parent : false}
      /> */}

      <TextField
        fullWidth
        label="Sıralama"
        variant="outlined"
        size="small"
        disabled={isSubmitting}
        {...getFieldProps("order")}
        helperText={errors.order && touched.order ? errors.order : null}
        error={errors.order ? touched.order : false}
      />

      <CategoryTree
        selected={handleCategoryParentSelected()}
        setSelected={handleCategoryParentSetSelected}
        expanded={handleCategoryParentSelected()}
      />
    </Stack>
  );
}
