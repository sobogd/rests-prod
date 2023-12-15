import { FC, useEffect, useMemo, useState } from "react";
import { OrderPositionModal } from "../OrderPositionModal/OrderPositionModal";
import { useTranslation } from "react-i18next";
import { OrderModalList } from "./OrderModalList";
import { utcToZonedTime } from "date-fns-tz";
import { OrderModalDiscountForOrder } from "./OrderModalDiscountForOrder";
import { OrderModalSplitting } from "./OrderModalSplitting";
import { OrderModalComment } from "./OrderModalComment";
import { OrderModalFinish } from "./OrderModalFinish";
import { OrderModalTableChange } from "./OrderModalTableChange";
import { usePrevious } from "../../../hooks/usePrevious";
import { ModalRests } from "../../ModalRests";
import {
  useListCategoriesWithPositionsQuery,
  useAddOrUpdateOrderMutation,
  useRemoveOrderByNumberMutation,
  useFinishOrderByNumberMutation,
  useLazyLoadOrderByNumberQuery,
} from "../api";
import NoData from "../../NoData";
import { IPositionForOrder } from "../../../../back/types";
import { OrderModalRemoving } from "./OrderModalRemoving";

export const OrderModal: FC<{
  setOrderNumber: (orderId: number | null | undefined) => void;
  orderNumber: number | null | undefined;
  tableId: number | undefined;
  setTableId: (tableId: number | undefined) => void;
}> = ({ orderNumber, setOrderNumber, tableId, setTableId }) => {
  const i18n = useTranslation();
  const [selectedPosition, setSelectedPosition] = useState<IPositionForOrder | null | undefined>(undefined);
  const [positions, setPositions] = useState<IPositionForOrder[]>([]);
  const [discountForOrder, setDiscountForOrder] = useState<number | null | undefined>(undefined);
  const [isOpenDiscountForOrder, setIsOpenDiscountForOrder] = useState<boolean>(false);
  const [isOpenSplitting, setIsOpenSplitting] = useState<boolean>(false);
  const [isOpenRemoving, setIsOpenRemoving] = useState<boolean>(false);
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [isOpenFinishing, setIsOpenFinishing] = useState<boolean>(false);
  const [isOpenTableChange, setIsOpenTableChange] = useState<boolean>(false);

  const { isFetching: isFetchingCategoriesWithPositions, isLoading: isLoadingCategoriesWithPositions } =
    useListCategoriesWithPositionsQuery();

  const [addOrUpdateOrder, { data: createdOrUpdatedOrder, isLoading: isLoadingOrderQuery }] =
    useAddOrUpdateOrderMutation();

  const [removeOrderByNumber, { isLoading: isLoadingRemoving, isSuccess: isSuccessRemoving }] =
    useRemoveOrderByNumberMutation();

  const [finishOrderByNumber, { isLoading: isLoadingFinish, isSuccess: isSuccessFinish }] =
    useFinishOrderByNumberMutation();

  const [loadOrder, { data: loadedOrder, isLoading: isLoadingOrder, isFetching: isFetchingOrder }] =
    useLazyLoadOrderByNumberQuery();

  const prevSelectedPosition = usePrevious(selectedPosition);

  const addOrUpdateHandler = (newPositions: IPositionForOrder[]) => {
    addOrUpdateOrder({
      p: newPositions,
      c: comment,
      t: tableId ?? 0,
      n: orderNumber ?? undefined,
      d: discountForOrder ?? undefined,
    });
  };

  const addNewPosition = (positionForAdding: IPositionForOrder) => {
    const newPositions = positions.concat([
      {
        ...positionForAdding,
        crt: utcToZonedTime(new Date(), "UTC").valueOf(),
        i: positions.length,
      },
    ]);
    addOrUpdateHandler(newPositions);
    setPositions(newPositions);
  };

  const clonePosition = (positionForCloning: IPositionForOrder) => {
    const newPositions = positions.concat([
      {
        ...positionForCloning,
        crt: utcToZonedTime(new Date(), "UTC").valueOf(),
        i: positions.length,
        f: undefined,
      },
    ]);
    addOrUpdateHandler(newPositions);
    setPositions(newPositions);
  };

  const removePositionByIndex = (index?: number) => {
    if (index !== undefined) {
      const newPositions = positions
        .filter((p) => p.i !== index)
        .map((p, i) => ({
          ...p,
          i,
        }));
      if (newPositions.length) {
        addOrUpdateHandler(newPositions);
        setPositions(newPositions);
      } else if (!newPositions?.length && !!orderNumber) {
        removeOrderByNumber({ orderNumber });
      }
    }
  };

  const editPositionByIndex = (positionForEditing: IPositionForOrder) => {
    const newPositions = positions.map((p, i) => {
      if (positionForEditing.i === i) {
        return { ...positionForEditing };
      } else {
        return p;
      }
    });
    addOrUpdateHandler(newPositions);
    setPositions(newPositions);
  };

  useEffect(() => {
    if (isSuccessRemoving) {
      setTableId(undefined);
    }
  }, [isSuccessRemoving]);

  useEffect(() => {
    if (tableId) {
      setOrderNumber(undefined);
    }
  }, [tableId]);

  useEffect(() => {
    if (isSuccessFinish) {
      setTableId(undefined);
    }
  }, [isSuccessFinish]);

  useEffect(() => {
    if (
      prevSelectedPosition !== undefined &&
      selectedPosition !== null &&
      selectedPosition !== undefined &&
      selectedPosition.i === undefined
    ) {
      addNewPosition(selectedPosition);
      setSelectedPosition(undefined);
    } else if (
      prevSelectedPosition !== undefined &&
      selectedPosition !== null &&
      selectedPosition !== undefined &&
      selectedPosition.i !== undefined
    ) {
      editPositionByIndex(selectedPosition);
      setSelectedPosition(undefined);
    }
  }, [selectedPosition]);

  useEffect(() => {
    if (createdOrUpdatedOrder != null) {
      setOrderNumber(createdOrUpdatedOrder);
    }
  }, [createdOrUpdatedOrder]);

  useEffect(() => {
    if (orderNumber != null) {
      loadOrder({ orderNumber });
    }
    setComment("");
  }, [orderNumber]);

  useEffect(() => {
    if (loadedOrder != null && orderNumber != null) {
      setPositions(loadedOrder?.p);
      setComment(loadedOrder?.c);
      setDiscountForOrder(Number(loadedOrder?.d));
    } else {
      setPositions([]);
      setComment("");
      setDiscountForOrder(undefined);
    }
  }, [loadedOrder, orderNumber]);

  const buttonsForOrder = [
    {
      title: i18n.t("orders.finishOrder"),
      onClick: () => setIsOpenFinishing(true),
    },
    positions?.length > 1
      ? {
          title: i18n.t("orders.splitOrder"),
          onClick: () => setIsOpenSplitting(true),
        }
      : null,
    {
      title: comment !== "" ? i18n.t("orders.editComment") : i18n.t("orders.addComment"),
      onClick: () => setIsOpenComment(true),
    },
    {
      title: i18n.t("orders.tableChange"),
      onClick: () => setIsOpenTableChange(true),
    },
    {
      title: discountForOrder ? i18n.t("orders.changeDiscount") : i18n.t("orders.addDiscount"),
      onClick: () => {
        setIsOpenDiscountForOrder(true);
      },
    },
    {
      title: i18n.t("orders.removeOrder"),
      onClick: () => setIsOpenRemoving(true),
    },
  ];

  const isLoading =
    isFetchingCategoriesWithPositions ||
    isLoadingCategoriesWithPositions ||
    isLoadingOrderQuery ||
    isLoadingOrder ||
    isFetchingOrder ||
    isLoadingRemoving ||
    isLoadingFinish;

  return (
    <>
      <ModalRests
        title={orderNumber ? i18n.t("orders.editTitle", { orderNumber }) : i18n.t("orders.newTitle")}
        onBack={() => setOrderNumber(undefined)}
        footerSticks={[
          {
            icon: "new",
            onClick: () => {
              setSelectedPosition(null);
            },
          },
        ]}
        withPadding
        moreButtons={orderNumber ? buttonsForOrder : undefined}
        moreTitle={i18n.t("orders.orderDialogTitle")}
        isShow={orderNumber !== undefined ? true : false}
        isLoading={isLoading}
        isAdditionalForAdditional
      >
        <OrderPositionModal
          onClone={(position) => {
            if (position) clonePosition(position);
            setSelectedPosition(undefined);
          }}
          onRemove={(position) => {
            if (position) removePositionByIndex(position?.i);
            setSelectedPosition(undefined);
          }}
          setSelectedPosition={setSelectedPosition}
          selectedPosition={selectedPosition}
        />
        <OrderModalTableChange
          onClose={() => setIsOpenTableChange(false)}
          onChangeTable={(newTableId) => {
            setIsOpenTableChange(false);
            addOrUpdateOrder({
              p: positions,
              c: comment,
              t: newTableId,
              n: orderNumber ?? undefined,
              d: discountForOrder ?? undefined,
            }).then(() => {
              setTableId(undefined);
            });
          }}
          isShow={isOpenTableChange}
        />
        <OrderModalRemoving
          onRemove={() => {
            setIsOpenRemoving(false);
            if (orderNumber) removeOrderByNumber({ orderNumber });
          }}
          onClose={() => setIsOpenRemoving(false)}
          isShow={isOpenRemoving}
        />
        <OrderModalSplitting
          isShow={isOpenSplitting}
          onClose={() => {
            setIsOpenSplitting(false);
          }}
          positions={positions}
          onSplit={(indexesForNewOrder) => {
            const positionForManipulating = positions;
            addOrUpdateOrder({
              p: positionForManipulating
                .filter((p) => !indexesForNewOrder.includes(p.i ?? -5))
                .map((p, i) => ({ ...p, i })),
              c: comment,
              t: tableId ?? 0,
              n: orderNumber ?? undefined,
              d: discountForOrder ?? undefined,
            }).then(() => {
              addOrUpdateOrder({
                p: positionForManipulating
                  .filter((p) => indexesForNewOrder.includes(p.i ?? -5))
                  .map((p, i) => ({ ...p, i })),
                c: comment,
                t: tableId ?? 0,
                n: undefined,
                d: discountForOrder ?? undefined,
              });
            });
          }}
        />
        <OrderModalComment
          onClose={() => setIsOpenComment(false)}
          comment={comment}
          onSave={(newComment) => {
            setComment(newComment);
            addOrUpdateOrder({
              p: positions,
              c: newComment,
              t: tableId ?? 0,
              n: orderNumber ?? undefined,
              d: discountForOrder ?? undefined,
            });
          }}
          isShow={isOpenComment}
        />
        <OrderModalDiscountForOrder
          onClose={() => {
            setIsOpenDiscountForOrder(false);
          }}
          isShow={isOpenDiscountForOrder}
          discountForOrder={discountForOrder ?? 0}
          onApplyDiscount={(percent) => {
            setDiscountForOrder(percent);
            setIsOpenDiscountForOrder(false);
            addOrUpdateOrder({
              p: positions,
              c: comment,
              t: tableId ?? 0,
              n: orderNumber ?? undefined,
              d: percent,
            });
          }}
        />
        <OrderModalFinish
          onClose={() => setIsOpenFinishing(false)}
          onFinish={(paymentMethod) => {
            if (orderNumber && paymentMethod) {
              finishOrderByNumber({
                orderNumber,
                paymentMethod,
              });
            }
          }}
          isShow={isOpenFinishing}
        />
        {!positions?.length ? (
          <NoData pt text={i18n.t("orders.emptyPositions")} />
        ) : (
          <OrderModalList
            positions={positions}
            setSelectedPosition={setSelectedPosition}
            discountForOrder={discountForOrder}
            onClickTotalBlcok={() => setIsOpenFinishing(true)}
          />
        )}
      </ModalRests>
    </>
  );
};
