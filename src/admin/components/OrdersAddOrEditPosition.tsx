import styled from '@emotion/styled';
import {
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  TbBurger,
  TbCategory,
  TbCopy,
  TbDiscount,
  TbMinus,
  TbPencil,
  TbPlus,
  TbSettings,
  TbTrash,
} from 'react-icons/tb';

import { IItem, IOrder, IPositionForOrder } from '../../back/types';
import { useAuth } from '../providers/Auth';
import { getOptionLangName } from '../utils/getOptionLangName';
import { getPositionNameInLang } from '../utils/getPositionTitleForList';
import { getVariantLangName } from '../utils/getVariantLangName';
import { dateMs } from '../utils/timeInFormat';

import { Button } from './Button';
import { Loading } from './Loading';
import { Modal } from './Modal';
import {
  useAddOrUpdateOrderMutation,
  useListCategoriesWithPositionsQuery,
} from './Orders/api';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${(p) => p.theme.background2};
  padding: 20px 30px;
  border-radius: 20px;
`;

const ListItemTitle = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 15px;
  font-size: 20px;
  line-height: 24px;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.text2};
  margin: -20px -30px;
  padding: 20px 30px;
  border-bottom: ${(p) => (p.isOpen ? `1px solid ${p.theme.divider}` : 'none')};

  svg:last-of-type {
    cursor: pointer;
  }
`;

const ListItemTitleName = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ListItemSelect = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItemOption = styled.div<{
  isActive?: boolean;
}>`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  color: ${(p) => p.theme.text1};
  padding: 15px 0;
  gap: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;

  :not(:last-of-type) {
    border-bottom: 1px solid ${(p) => p.theme.divider};
  }

  ::before {
    min-width: 14px;
    min-height: 14px;
    max-width: 14px;
    max-height: 14px;
    content: '';
    background: ${(p) => (p.isActive ? p.theme.primary1 : p.theme.background3)};
    border-radius: 20px;
    margin: auto 0;
  }
`;

const ListItemOptionDescription = styled.div`
  color: ${(p) => p.theme.text2};
  flex: 1;
  text-align: right;
  white-space: nowrap;
`;

const ListItemDiscount = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0;

  button {
    padding: 0;
    width: 40px;
    min-width: 40px;
    max-width: 40px;
  }
`;

const ListItemDiscountValue = styled.div`
  color: ${(p) => p.theme.text1};
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 15px;
`;

const ButtonCopyOrRemove = styled(Button)`
  width: 50px;
  min-width: 50px;
  max-width: 50px;
  padding: 0;
`;

const ListItemComment = styled.textarea`
  color: ${(p) => p.theme.text1};
  background: ${(p) => p.theme.background2};
  width: calc(100% + 60px);
  min-height: 100px;
  max-height: 100px;
  resize: none;
  border: 0;
  margin: -10px -30px -20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 20px 30px;
  outline-color: ${(p) => p.theme.primary1};
`;

type Props = {
  order: IOrder | undefined;
  tableId: number | undefined;
  editPositionIndex: number | null;
  onClose: (update?: boolean) => void;
};

type BlockProps = {
  title: string;
  show: boolean;
  open: boolean;
  icon: ReactNode;
  options: {
    index: number;
    name?: string;
    price?: number;
    isActive?: boolean;
  }[];
  onClickOption: (index: number) => void;
  onClickReset: () => void;
};

export const OrdersAddOrEditPosition = memo((props: Props) => {
  const { tableId, order, editPositionIndex, onClose } = props;

  const { t, i18n } = useTranslation();
  const { currencySymbol } = useAuth();

  const [category, setCategory] = useState<string | undefined>();
  const [position, setPosition] = useState<IItem | undefined>();
  const [variantIndex, setVariantIndex] = useState<number | undefined>();
  const [optionsIndexes, setOptionsIndexes] = useState<number[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const [addOrUpdateOrder, addOrUpdateResult] = useAddOrUpdateOrderMutation();

  const positionsWithCategories = useListCategoriesWithPositionsQuery();

  useEffect(() => {
    if (addOrUpdateResult.isSuccess) onClose(true);
  }, [addOrUpdateResult.isSuccess, onClose]);

  useEffect(() => {
    if (
      editPositionIndex !== null &&
      order?.p?.length &&
      positionsWithCategories?.data?.length
    ) {
      const position = positionsWithCategories?.data
        ?.find(
          (category) =>
            category?.i?.find(
              (item) => item.id === order.p[editPositionIndex]?.id,
            )?.id,
        )
        ?.i?.find((item) => item.id === order.p[editPositionIndex]?.id);

      setCategory(
        positionsWithCategories?.data?.find(
          (category) =>
            category?.i?.find(
              (item) => item.id === order.p[editPositionIndex]?.id,
            )?.c,
        )?.c,
      );
      setPosition(position);
      setVariantIndex(
        position?.v?.findIndex(
          (v) => v.n === order?.p?.[editPositionIndex]?.v?.n,
        ),
      );
      setOptionsIndexes(
        order?.p?.[editPositionIndex]?.o
          ?.map((o) => position?.o?.findIndex((ot) => ot.n === o.n) as number)
          ?.filter((o) => o !== undefined) ?? [],
      );
      setComment(order?.p?.[editPositionIndex]?.c ?? '');
      setDiscount(order?.p?.[editPositionIndex]?.d ?? 0);
    }
  }, [editPositionIndex, order?.p, positionsWithCategories?.data]);

  const categories = useMemo(
    () => positionsWithCategories?.data?.map((p) => p.c) ?? [],
    [positionsWithCategories?.data],
  );

  const renderSelectBlock = useCallback(
    (props: BlockProps) =>
      props.show ? (
        <ListItem>
          <ListItemTitle isOpen={props.open}>
            {props.icon}
            <ListItemTitleName>{props.title}</ListItemTitleName>
            {!props.open && <TbPencil onClick={props.onClickReset} />}
          </ListItemTitle>
          {props.open && (
            <ListItemSelect>
              {(props.options ?? [])?.map((option) => (
                <ListItemOption
                  key={option.index + (option.name ?? '') + option.price}
                  onClick={() => props.onClickOption(option.index)}
                  isActive={option.isActive}
                >
                  {option.name ?? ''}
                  {option.price !== undefined ? (
                    <ListItemOptionDescription>
                      +{option.price ?? 0} {currencySymbol}
                    </ListItemOptionDescription>
                  ) : null}
                </ListItemOption>
              ))}
            </ListItemSelect>
          )}
        </ListItem>
      ) : null,
    [currencySymbol],
  );

  const categoriesProps = useMemo(
    (): BlockProps => ({
      icon: <TbCategory />,
      title: category ?? 'Select category:',
      show: true,
      open: !category,
      options: categories?.map((name, index) => ({ index, name })) ?? [],
      onClickOption: (index: number) => setCategory(categories?.[index]),
      onClickReset: () => {
        setCategory(undefined);
        setPosition(undefined);
        setVariantIndex(undefined);
        setOptionsIndexes([]);
      },
    }),
    [categories, category],
  );

  const positionsProps = useMemo((): BlockProps => {
    const positions = positionsWithCategories?.data
      ?.filter((i) => category === i.c)
      ?.map((i) => i.i)?.[0];

    return {
      icon: <TbBurger />,
      title: position?.n ? getPositionNameInLang(position) : 'Select item:',
      show: !!positions?.length,
      open: !position,
      options:
        positions?.map((item, index) => ({
          index,
          name: getPositionNameInLang(item),
          price: item.p,
        })) ?? [],
      onClickOption: (index: number) => setPosition(positions?.[index]),
      onClickReset: () => {
        setPosition(undefined);
        setVariantIndex(undefined);
        setOptionsIndexes([]);
      },
    };
  }, [category, position, positionsWithCategories?.data]);

  const variantsProps = useMemo(
    (): BlockProps => ({
      icon: <TbSettings />,
      title:
        variantIndex !== undefined && position
          ? getVariantLangName(position, variantIndex, i18n.language)
          : 'Select variant:',
      show: !!position?.v?.length && !!position,
      open: variantIndex === undefined,
      options:
        position?.v?.map((variant, index) => ({
          index,
          name: getVariantLangName(position, index, i18n.language),
          price: variant.p,
        })) ?? [],
      onClickOption: (index: number) => setVariantIndex(index),
      onClickReset: () => {
        setVariantIndex(undefined);
        setOptionsIndexes([]);
      },
    }),
    [i18n.language, position, variantIndex],
  );

  const optionsProps = useMemo(
    (): BlockProps => ({
      title: 'Add options:',
      icon: <TbPlus />,
      show:
        !!position?.o?.length &&
        !!position &&
        (position.v?.length ? variantIndex !== undefined : true),
      open: true,
      options:
        position?.o?.map((option, index) => ({
          index,
          name: getOptionLangName(position, index, i18n.language),
          price: option.p,
          isActive: optionsIndexes.includes(index),
        })) ?? [],
      onClickOption: (index: number) => {
        setOptionsIndexes(
          optionsIndexes.includes(index)
            ? optionsIndexes.filter((option) => option !== index)
            : [...optionsIndexes, index],
        );
      },
      onClickReset: () => {
        setOptionsIndexes([]);
      },
    }),
    [i18n.language, optionsIndexes, position, variantIndex],
  );

  const discountHandler = useCallback(
    (type: 'plus' | 'minus') => () => {
      setDiscount((prevState) => {
        if (type === 'plus' && prevState < 100) {
          return prevState + 5;
        } else if (type === 'minus' && prevState > 0) {
          return prevState - 5;
        } else {
          return prevState;
        }
      });
    },
    [],
  );

  const isRequiredFilled =
    !!position && (position?.v?.length ? variantIndex !== undefined : true);

  const orderHandler = useCallback(
    (positions: IPositionForOrder[]) => {
      addOrUpdateOrder({
        p: positions,
        c: order?.c ?? '',
        t: order?.t ?? tableId ?? 0,
        n: order?.n ?? undefined,
        d: order?.d ?? undefined,
        crt: order?.crt ? order.crt : dateMs(),
      });
    },
    [
      addOrUpdateOrder,
      order?.c,
      order?.crt,
      order?.d,
      order?.n,
      order?.t,
      tableId,
    ],
  );

  const addNewPosition = useCallback(() => {
    orderHandler(
      (order?.p ?? []).concat({
        id: position?.id,
        n: position?.n,
        p: position?.p,
        v: position?.v?.find((_, index) => index === variantIndex),
        o: position?.o?.filter((_, index) => optionsIndexes.includes(index)),
        t: position?.t,
        c: comment,
        cat: Number(position?.c) ?? 0,
        crt: dateMs(),
        pr: undefined,
        d: discount ?? undefined,
      }),
    );
  }, [
    comment,
    discount,
    optionsIndexes,
    order?.p,
    orderHandler,
    position?.c,
    position?.id,
    position?.n,
    position?.o,
    position?.p,
    position?.t,
    position?.v,
    variantIndex,
  ]);

  const onSave = useCallback(() => {
    if (editPositionIndex !== null) {
      orderHandler(
        (order?.p ?? []).map((p, i) => {
          if (i === editPositionIndex) {
            return {
              id: position?.id,
              n: position?.n,
              p: position?.p,
              v: position?.v?.find((_, index) => index === variantIndex),
              o: position?.o?.filter((_, index) =>
                optionsIndexes.includes(index),
              ),
              t: position?.t,
              c: comment,
              i: editPositionIndex,
              cat: Number(position?.c) ?? 0,
              crt: dateMs(),
              pr: undefined,
              d: discount ?? undefined,
            };
          } else {
            return p;
          }
        }),
      );
    } else {
      addNewPosition();
    }
  }, [
    addNewPosition,
    comment,
    discount,
    editPositionIndex,
    optionsIndexes,
    order?.p,
    orderHandler,
    position?.c,
    position?.id,
    position?.n,
    position?.o,
    position?.p,
    position?.t,
    position?.v,
    variantIndex,
  ]);

  const onRemove = useCallback(() => {
    if (editPositionIndex !== null) {
      orderHandler(
        (order?.p ?? []).filter((_, index) => index !== editPositionIndex),
      );
    }
  }, [editPositionIndex, order?.p, orderHandler]);

  const onClone = useCallback(() => {
    if (editPositionIndex !== null) {
      addNewPosition();
    }
  }, [addNewPosition, editPositionIndex]);

  return (
    <Modal onClose={onClose} title={'Add new item'}>
      <Loading
        isFullscreen
        isLoading={
          positionsWithCategories.isLoading ||
          positionsWithCategories.isFetching ||
          positionsWithCategories.isUninitialized
        }
      />
      {!!categories?.length && (
        <List>
          {renderSelectBlock(categoriesProps)}
          {renderSelectBlock(positionsProps)}
          {renderSelectBlock(variantsProps)}
          {renderSelectBlock(optionsProps)}
          {isRequiredFilled && (
            <ListItem>
              <ListItemTitle isOpen={true}>
                <TbDiscount />
                <ListItemTitleName>Discount</ListItemTitleName>
              </ListItemTitle>
              <ListItemDiscount>
                <Button
                  onClick={discountHandler('minus')}
                  label={<TbMinus />}
                  size="small"
                  color="secondary"
                />
                <ListItemDiscountValue>{discount}%</ListItemDiscountValue>
                <Button
                  onClick={discountHandler('plus')}
                  label={<TbPlus />}
                  size="small"
                  color="secondary"
                />
              </ListItemDiscount>
            </ListItem>
          )}
          {isRequiredFilled && (
            <ListItem>
              <ListItemTitle isOpen={true}>
                <TbDiscount />
                <ListItemTitleName>Comment</ListItemTitleName>
              </ListItemTitle>
              <ListItemComment
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type comment for item..."
              />
            </ListItem>
          )}

          {isRequiredFilled && (
            <Buttons>
              {isRequiredFilled && editPositionIndex !== null && (
                <ButtonCopyOrRemove
                  label={<TbTrash />}
                  isLoading={addOrUpdateResult.isLoading}
                  color="secondary"
                  onClick={onRemove}
                />
              )}
              {isRequiredFilled && editPositionIndex !== null && (
                <ButtonCopyOrRemove
                  label={<TbCopy />}
                  isLoading={addOrUpdateResult.isLoading}
                  color="secondary"
                  onClick={onClone}
                />
              )}
              <Button
                label={'Save item'}
                isLoading={addOrUpdateResult.isLoading}
                onClick={onSave}
              />
            </Buttons>
          )}
        </List>
      )}
    </Modal>
  );
});
