import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IUser } from '../../back/types';
import { API } from '../api';
import { Card } from './Card';
import { Nothing } from './Nothing';
import { Wrapper } from './Wrapper';

type Props = {
  onEdit: (id: number) => void;
  onAdd: () => void;
};

export const UsersList = memo((props: Props) => {
  const { onEdit, onAdd } = props;

  const i18n = useTranslation();

  const { data, isLoading, isFetching, refetch } = API.useUsersQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const clickCardHandler = useCallback(
    (user: IUser) => () => {
      if (user.id) onEdit(user.id);
    },
    [],
  );

  return (
    <Wrapper
      header={
        data?.length
          ? {
              title: i18n.t('users.title'),
              subTitle: i18n.t('users.subtitle'),
            }
          : undefined
      }
      isLoading={isLoading || isFetching}
      buttons={
        data?.length
          ? [{ label: i18n.t('users.add'), onClick: onAdd }]
          : undefined
      }
    >
      {!data?.length ? (
        <Nothing
          title={i18n.t('users.title_empty')}
          description={i18n.t('users.nothing')}
          button={{
            onClick: onAdd,
            label: i18n.t('users.add'),
          }}
        />
      ) : (
        data?.map((user) => (
          <Card
            onClick={clickCardHandler(user)}
            header={{ title: user.name ?? '' }}
            noWrap
          />
        ))
      )}
    </Wrapper>
  );
});
