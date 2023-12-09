import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import InputWithClear from "../InputWithClear";
import NoData from "../NoData";
import { IMethod } from "../../../back/types";
import { useMethodsQuery } from "./api";
import { MethodForm } from "./MethodForm";
import List from "../List";

export const MethodsList: FC = () => {
  const { t } = useTranslation();

  const [selectedMethodId, setSelectedMethodId] = useState<number | null | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useMethodsQuery(undefined);

  const filteredMethods: IMethod[] = useMemo(
    () =>
      data?.filter((method: IMethod) =>
        searchQuery !== "" && !method?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ? false : true
      ) ?? [],
    [data, searchQuery]
  );

  return (
    <>
      <ModalRests
        title={t("methods.list.title")}
        footerSticks={[
          {
            icon: "new",
            onClick: () => {
              setSelectedMethodId(null);
            },
          },
        ]}
        withPadding
        isGeneral
        isLoading={isLoading || isFetching}
        moreButtons={[{ title: t("methods.list.update"), onClick: () => refetch() }]}
        isOpenAdditional={selectedMethodId !== undefined ? true : false}
      >
        <InputWithClear
          placeholder={t("methods.list.search")}
          value={searchQuery}
          onChangeValue={(value) => setSearchQuery(value as string)}
        />
        {!filteredMethods?.length ? (
          <NoData pt text={t("methods.list.empty")} />
        ) : (
          <List
            items={filteredMethods.map((method) => ({
              title: `${method.title}`,
              description: method.description,
              buttonType: "next",
              onClick: () => setSelectedMethodId(method.id),
              id: method.id,
            }))}
          />
        )}
      </ModalRests>
      <MethodForm
        onBack={() => setSelectedMethodId(undefined)}
        refetch={refetch}
        selectedMethodId={selectedMethodId}
      />
    </>
  );
};
