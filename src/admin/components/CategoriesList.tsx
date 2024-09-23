import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ICategory } from '../../back/types';
import { API } from '../api';
import { Card } from './Card';
import { Nothing } from './Nothing';
import { Wrapper } from './Wrapper';

type Props = {
  onEdit: (id: number) => void;
  onAdd: () => void;
};

export const CategoriesList = memo((props: Props) => {
  const { onEdit, onAdd } = props;

  const i18n = useTranslation();

  const { data, isLoading, isFetching } = API.useCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const clickCardHandler = useCallback(
    (category: ICategory) => () => {
      if (category.id) onEdit(category.id);
    },
    [],
  );

  return (
    <Wrapper
      header={
        data?.length
          ? {
              title: i18n.t('categories.title'),
              subTitle: i18n.t('categories.subtitle'),
            }
          : undefined
      }
      isLoading={isLoading || isFetching}
      buttons={
        data?.length
          ? [{ label: i18n.t('categories.add'), onClick: onAdd }]
          : undefined
      }
    >
      {!data?.length ? (
        <Nothing
          title={i18n.t('categories.title_empty')}
          description={i18n.t('categories.nothing')}
          button={{
            onClick: onAdd,
            label: i18n.t('categories.add'),
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
