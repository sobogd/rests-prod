import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalRests } from "../ModalRests";
import InputWithClear from "../InputWithClear";
import NoData from "../NoData";
import { IUser } from "../../../back/types";
import { useUsersQuery } from "./api";
import { UserForm } from "./UserForm";
import List from "../List";

export const UsersList: FC = () => {
  const { t } = useTranslation();

  const [selectedUserId, setSelectedUserId] = useState<number | null | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data, isLoading, isFetching, refetch } = useUsersQuery(undefined);

  const filteredUsers: IUser[] = useMemo(
    () =>
      data?.filter((user: IUser) =>
        searchQuery !== "" && !user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ? false : true
      ) ?? [],
    [data, searchQuery]
  );

  return (
    <>
      <ModalRests
        title={t("users.list.title")}
        footerSticks={[
          {
            icon: "new",
            onClick: () => {
              setSelectedUserId(null);
            },
          },
        ]}
        withPadding
        isLoading={isLoading || isFetching}
        moreButtons={[{ title: t("users.list.update"), onClick: () => refetch() }]}
        isOpenAdditional={selectedUserId !== undefined}
        isGeneral
      >
        <InputWithClear
          placeholder={t("users.list.search")}
          value={searchQuery}
          onChangeValue={(value) => setSearchQuery(value as string)}
        />
        {!filteredUsers?.length ? (
          <NoData pt text={t("users.list.empty")} />
        ) : (
          <List
            items={filteredUsers.map((user) => ({
              title: user.name,
              description: `${t("users.list.login")}: ${user?.login}`,
              buttonType: "next",
              onClick: () => setSelectedUserId(user.id),
              id: user.id,
            }))}
          />
        )}
      </ModalRests>
      <UserForm
        onBack={() => setSelectedUserId(undefined)}
        refetch={refetch}
        selectedUserId={selectedUserId}
      />
    </>
  );
};
