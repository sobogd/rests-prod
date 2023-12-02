import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../../shared/loading";
import { ModalRests } from "../../shared/ModalRests";
import { UniversalList, UniversalListItemBordered } from "../../app/styles";
import InputWithClear from "../../shared/InputWithClear";
import NoData from "../../shared/NoData";
import styled from "@emotion/styled";
import { DialogRests } from "../../shared/DialogRests";
import { ICategory } from "../../../back/types";
import { useCategoriesQuery, useDeleteCategoryMutation } from "./api";
import { CategoryForm } from "./CategoryForm";

const UniversalListItemBorderedPos = styled(UniversalListItemBordered)`
  width: 100%;
  margin-left: 0;
  margin-right: 0;
`;

export const CategoriesList: FC = () => {
  const i18n = useTranslation();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null | undefined>(undefined);
  const [categoryIdForDialog, setCategoryIdForDialog] = useState<number | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useCategoriesQuery(undefined);
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleRemoveCategory = (id: number) => {
    deleteCategory(id).then(() => refetch());
  };

  const filteredCategories: ICategory[] = useMemo(
    () =>
      data?.filter((category: ICategory) =>
        searchQuery !== "" && !category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ? false
          : true
      ) ?? [],
    [data, searchQuery]
  );

  const handleUpdate = () => {
    setSelectedCategoryId(undefined);
    refetch();
  };

  const categoryModal =
    selectedCategoryId !== undefined ? (
      <CategoryForm onBack={handleUpdate} selectedCategoryId={selectedCategoryId} />
    ) : null;

  const emptyCategories = !filteredCategories?.length ? (
    <NoData text={i18n.t("categories.list.empty")} />
  ) : null;

  const categoriesList = (
    <UniversalList>
      {filteredCategories.map((category) => (
        <UniversalListItemBorderedPos key={category.id} onClick={() => setCategoryIdForDialog(category.id)}>
          <p>{category.name}</p>
          <p>
            <span>
              {i18n.t("categories.list.sort")}: {category?.sort}
            </span>
          </p>
        </UniversalListItemBorderedPos>
      ))}
    </UniversalList>
  );

  const categoryDialog = useMemo(
    () =>
      categoryIdForDialog !== undefined ? (
        <DialogRests
          onClose={() => {
            setCategoryIdForDialog(undefined);
          }}
          buttons={[
            {
              title: i18n.t("categories.list.edit"),
              onClick: () => {
                setSelectedCategoryId(categoryIdForDialog);
              },
            },
            {
              title: i18n.t("categories.list.remove"),
              onClick: () => {
                handleRemoveCategory(categoryIdForDialog);
              },
            },
          ]}
          title={i18n.t("categories.list.dialog")}
        />
      ) : null,
    [categoryIdForDialog]
  );

  return (
    <ModalRests
      title={i18n.t("menu.names.CATEGORIES")}
      isHaveMenu={true}
      footerButton={{
        title: i18n.t("categories.list.add"),
        onClick: () => {
          setSelectedCategoryId(null);
        },
      }}
      withPadding
    >
      <Loading isLoading={isLoading || isFetching || isDeleting} />
      <InputWithClear
        placeholder={i18n.t("categories.list.search")}
        value={searchQuery}
        onChangeValue={(value) => setSearchQuery(value as string)}
      />
      {categoryModal}
      {emptyCategories}
      {categoriesList}
      {categoryDialog}
    </ModalRests>
  );
};
