import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IItem } from '../../../back/types';
import { useAuth } from '../../providers/Auth';
import InputWithClear from '../InputWithClear';
import List from '../List';
import { ModalRests } from '../ModalRests';
import NoData from '../NoData';

import { useLazyItemsQuery } from './api';
import { ItemForm } from './ItemForm';

export const ItemsList: FC = () => {
  const i18n = useTranslation();
  const symbol = useAuth()?.whoami?.company?.symbol;

  const [selectedItemId, setSelectedItemId] = useState<
    number | null | undefined
  >(undefined);
  const [selectedCopyItemId, setSelectedCopyItemId] = useState<
    number | undefined
  >(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [load, { data, isLoading, isFetching }] = useLazyItemsQuery(undefined);

  useEffect(() => {
    load();
  }, []);

  const filteredItems: IItem[] = useMemo(
    () =>
      data?.filter((item: IItem) =>
        searchQuery !== '' &&
        !item?.n?.toLowerCase().includes(searchQuery.toLowerCase())
          ? false
          : true,
      ) ?? [],
    [data, searchQuery],
  );

  return (
    <>
      <ModalRests
        title={i18n.t('menu.names.POSITIONS')}
        footerSticks={[
          {
            icon: 'new',
            onClick: () => {
              setSelectedItemId(null);
            },
          },
        ]}
        withPadding
        moreButtons={[
          { title: i18n.t('items.list.update'), onClick: () => load() },
        ]}
        isOpenAdditional={
          selectedItemId !== undefined || selectedCopyItemId !== undefined
        }
        isGeneral
        isLoading={isLoading || isFetching}
      >
        <InputWithClear
          placeholder={i18n.t('items.list.search')}
          value={searchQuery}
          onChangeValue={(value) => setSearchQuery(value as string)}
        />
        {!filteredItems?.length ? (
          <NoData text={i18n.t('items.list.empty')} />
        ) : (
          <List
            items={filteredItems.map((item) => ({
              buttonType: 'next',
              onClick: () => setSelectedItemId(item.id),
              id: item.id,
              title: item.n,
              description: `${i18n.t('items.list.sort')}: ${item?.s} / ${i18n.t(
                'items.list.price',
              )}: ${item?.p} ${symbol}`,
            }))}
          />
        )}
      </ModalRests>
      <ItemForm
        onBack={() => {
          setSelectedItemId(undefined);
          setSelectedCopyItemId(undefined);
        }}
        onCopy={() => {
          const copyId = selectedItemId ?? undefined;
          setSelectedItemId(undefined);
          setSelectedCopyItemId(copyId);
        }}
        refetch={() => load()}
        selectedItemId={selectedItemId}
        selectedCopyItemId={selectedCopyItemId}
      />
    </>
  );
};
