import React, { useEffect } from "react";
import { Box, Button, List, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { Header } from "../../shared/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LoadingInside } from "../../shared/LoadingInside";
import { borderColorDefault } from "../../app/styles";
import { CategoriesFormGeneral } from "./CategoriesFormGeneral";
import { CategoriesFormTranslation } from "./CategoriesFormTranslation";
import { ECategoriesTabs } from "./enums";
import { categoriesActions } from "./slice";
import {
  useArchiveCategoryMutation,
  useCreateCategoryMutation,
  useLazyGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "./api";
import { searchCategories } from "../../api/categories";
import { IOption } from "../../app/interfaces";

interface Form {
  name: string;
  description: string;
  translations: { code?: IOption; name: string }[];
}

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

export const CategoryForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const categoryId = useAppSelector((s) => s.categories.categoryId);

  const methods = useForm<Form>({
    resolver: yupResolver(schema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      translations: [],
    },
  });
  const { handleSubmit, reset } = methods;

  const [loadCategory, { data, isLoading, isFetching }] = useLazyGetCategoryDetailsQuery();
  const [createCategory, { data: createdCategory, isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { data: updatedCategory, isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [archiveCategory, { data: archivedCategory, isLoading: isArchiving }] = useArchiveCategoryMutation();

  const loading = isLoading || isFetching || isCreating || isUpdating || isArchiving;

  useEffect(() => {
    if (categoryId) {
      loadCategory(categoryId);
    }
  }, [categoryId, loadCategory]);

  useEffect(() => {
    if (createdCategory || updatedCategory || archivedCategory) {
      dispatch(categoriesActions.setCategoryId(undefined));
      dispatch(categoriesActions.setTab(ECategoriesTabs.LIST));
      dispatch(searchCategories());
    }
  }, [createdCategory, updatedCategory, archivedCategory, dispatch]);

  useEffect(() => {
    if (data?.id) {
      reset({
        name: data?.name || "",
        description: data?.description || "",
        translations: data?.translations?.map((t) => ({
          code: { name: "", code: t.code },
          name: t.name,
        })),
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<Form> = (form) => {
    const method = !categoryId ? createCategory : updateCategory;
    method({
      id: categoryId || undefined,
      name: form?.name || "",
      description: form?.description || "",
      translations: form?.translations?.map((t) => ({
        code: t.code?.code?.toString() ?? "",
        name: t.name,
      })),
    });
  };

  const handleArchiveCategory = () => {
    if (categoryId) {
      archiveCategory(categoryId);
    }
  };

  const handleClickBack = () => {
    dispatch(categoriesActions.setCategoryId(undefined));
    dispatch(categoriesActions.setTab(ECategoriesTabs.LIST));
  };

  return (
    <Stack direction="column" width="100%" height="100%" paddingRight={2} paddingTop={2} paddingLeft={2}>
      <Header
        title={categoryId ? "Edit position" : "Add new position"}
        subtitle={`List of items for category`}
        startIcon={<ArrowBackIcon onClick={handleClickBack} />}
        endIcon={!loading && <DeleteForeverIcon onClick={handleArchiveCategory} />}
        isHaveBorder
      />
      <Stack
        sx={{
          height: "100%",
          flex: "100% 1",
          position: "relative",
          overflowY: "scroll",
        }}
      >
        <LoadingInside isLoading={loading} />
        <List
          sx={{
            height: "100%",
            flex: "100% 1",
            position: "relative",
            overflowY: "scroll",
            li: {
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        >
          <FormProvider {...methods}>
            <CategoriesFormGeneral />
            <CategoriesFormTranslation />
          </FormProvider>
        </List>
        {!loading && (
          <Box
            sx={{
              borderTop: 1,
              borderColor: borderColorDefault,
              paddingTop: "16px",
              paddingBottom: "16px",
              marginBottom: 0,
              marginTop: 0,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              onClick={handleSubmit(onSubmit)}
            >
              Save position
            </Button>
          </Box>
        )}
      </Stack>
    </Stack>
  );
};
