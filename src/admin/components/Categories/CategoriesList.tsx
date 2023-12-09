import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Loading from "../loading";
import { ModalRests } from "../ModalRests";
import InputWithClear from "../InputWithClear";
import NoData from "../NoData";
import { ICategory } from "../../../back/types";
import { useCategoriesQuery } from "./api";
import { CategoryForm } from "./CategoryForm";
import List from "../List";

export const CategoriesList: FC = () => {
  const i18n = useTranslation();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useCategoriesQuery(undefined);

  const filteredCategories: ICategory[] = useMemo(
    () =>
      data?.filter((category: ICategory) =>
        searchQuery !== "" && !category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
          ? false
          : true
      ) ?? [],
    [data, searchQuery]
  );

  return (
    <>
      <ModalRests
        title={i18n.t("menu.names.CATEGORIES")}
        isHaveMenu={true}
        footerSticks={[
          {
            icon: "new",
            onClick: () => setSelectedCategoryId(null),
          },
        ]}
        withPadding
        isGeneral
        isOpenAdditional={selectedCategoryId !== undefined}
        moreButtons={[{ title: i18n.t("categories.list.update"), onClick: () => refetch() }]}
      >
        <Loading isLoading={isLoading || isFetching} />
        <InputWithClear
          placeholder={i18n.t("categories.list.search")}
          value={searchQuery}
          onChangeValue={(value) => setSearchQuery(value as string)}
        />
        {!filteredCategories?.length ? (
          <NoData text={i18n.t("categories.list.empty")} />
        ) : (
          <List
            items={filteredCategories.map((category) => ({
              id: category.id,
              title: category.name,
              description: `${i18n.t("categories.list.sort")}: ${category?.sort}`,
              buttonType: "next",
              onClick: () => setSelectedCategoryId(category.id),
            }))}
          />
        )}
      </ModalRests>
      <CategoryForm
        onBack={() => setSelectedCategoryId(undefined)}
        refetch={refetch}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  );
};
