import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { OrderPositionModal } from "../OrderPositionModal/OrderPositionModal";
import { useTranslation } from "react-i18next";
import { OrderModalList } from "./OrderModalList";
import { utcToZonedTime } from "date-fns-tz";
import { OrderModalDiscountForPosition } from "./OrderModalDiscountForPosition";
import { OrderModalTotalBlock } from "./OrderModalTotalBlock";
import { OrderModalDiscountForOrder } from "./OrderModalDiscountForOrder";
import styled from "@emotion/styled";
import { OrderModalSplitting } from "./OrderModalSplitting";
import { OrderModalComment } from "./OrderModalComment";
import { OrderModalFinish } from "./OrderModalFinish";
import { OrderModalTableChange } from "./OrderModalTableChange";
import { NothingBlock } from "../../../app/styles";
import { usePrevious } from "../../../hooks/usePrevious";
import { DialogRests } from "../../../shared/DialogRests";
import { ModalRests } from "../../../shared/ModalRests";
import Loading from "../../../shared/loading";
import {
  useListCategoriesWithPositionsQuery,
  useAddOrUpdateOrderMutation,
  useRemoveOrderByNumberMutation,
  useFinishOrderByNumberMutation,
  useLazyLoadOrderByNumberQuery,
} from "../api";
import { IPositionForOrder } from "../../../../back/types/o";

const ListWithTotal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    :first-child {
      height: calc(100% - 50px);
      overflow-y: scroll;
      display: block;
    }
    :last-child {
      height: 50px;
      background: #ffc858;
      color: white;
      font-weight: 600;
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-size: 16px;
      justify-content: space-between;
    }
  }
`;

export const OrderModal: FC<{
  setOrderNumber: (orderId: number | null | undefined) => void;
  orderNumber: number | null | undefined;
  tableId: number | undefined;
  setTableId: (tableId: number | undefined) => void;
}> = ({ orderNumber, setOrderNumber, tableId, setTableId }) => {
  const i18n = useTranslation();
  const [selectedPosition, setSelectedPosition] = useState<IPositionForOrder | null | undefined>(undefined);
  const [positions, setPositions] = useState<IPositionForOrder[]>([]);
  const [positionForDialog, setPositionForDialog] = useState<IPositionForOrder | undefined>(undefined);
  const [positionForRemovingDialog, setPositionForRemovingDialog] = useState<IPositionForOrder | undefined>(
    undefined
  );
  const [orderNumberForRemovingDialog, setOrderNumberForRemovingDialog] = useState<number | undefined>(
    undefined
  );
  const [isOpenDiscountForPosition, setIsOpenDiscountForPosition] = useState<IPositionForOrder | undefined>(
    undefined
  );
  const [discountForOrder, setDiscountForOrder] = useState<number | null | undefined>(undefined);
  const [isOpenDiscountForOrder, setIsOpenDiscountForOrder] = useState<boolean>(false);
  const [isOpenSplitting, setIsOpenSplitting] = useState<boolean>(false);
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
  }, [orderNumber]);

  useEffect(() => {
    if (loadedOrder != null) {
      setPositions(loadedOrder?.p);
      setComment(loadedOrder?.c);
      setDiscountForOrder(loadedOrder?.d);
    }
  }, [loadedOrder]);

  const buttonsForOrder = [
    {
      title: i18n.t("orders.finishOrder"),
      onClick: () => setIsOpenFinishing(true),
    },
    {
      title: i18n.t("orders.printBill"),
      onClick: () => {},
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
      title: discountForOrder ? i18n.t("orders.removeDiscount") : i18n.t("orders.addDiscount"),
      onClick: () => {
        if (discountForOrder) {
          setDiscountForOrder(undefined);
          addOrUpdateOrder({
            p: positions,
            c: comment,
            t: tableId ?? 0,
            n: orderNumber ?? undefined,
            d: undefined,
          });
        } else {
          setIsOpenDiscountForOrder(true);
        }
      },
    },
    {
      title: i18n.t("orders.removeOrder"),
      onClick: () => setOrderNumberForRemovingDialog(orderNumber ?? undefined),
    },
  ];

  const getButtonsForPosition = useCallback(
    (positionForDialog: IPositionForOrder) => [
      {
        title: i18n.t("orders.editPosition"),
        onClick: () => {
          setSelectedPosition(positionForDialog);
        },
      },
      {
        title: i18n.t("orders.clonePosition"),
        onClick: () => {
          clonePosition(positionForDialog);
        },
      },
      {
        title: positionForDialog?.d ? i18n.t("orders.removeDiscount") : i18n.t("orders.addDiscount"),
        onClick: () => {
          positionForDialog?.d
            ? editPositionByIndex({ ...positionForDialog, d: undefined })
            : setIsOpenDiscountForPosition(positionForDialog);
        },
      },
      {
        title: i18n.t("orders.removePosition"),
        onClick: () => setPositionForRemovingDialog(positionForDialog),
      },
    ],
    [positionForDialog]
  );

  const getButtonForFooter = () => {
    return {
      title: i18n.t("orders.addPosition"),
      onClick: () => {
        setSelectedPosition(null);
      },
    };
  };

  const positionModal = useMemo(
    () =>
      selectedPosition !== undefined ? (
        <OrderPositionModal setSelectedPosition={setSelectedPosition} selectedPosition={selectedPosition} />
      ) : null,
    [selectedPosition]
  );

  const positionDialog = useMemo(
    () =>
      positionForDialog !== undefined ? (
        <DialogRests
          onClose={() => {
            setPositionForDialog(undefined);
          }}
          buttons={getButtonsForPosition(positionForDialog)}
          title={i18n.t("orders.positionDialogTitle")}
        />
      ) : null,
    [positionForDialog]
  );

  const isLoading =
    isFetchingCategoriesWithPositions ||
    isLoadingCategoriesWithPositions ||
    isLoadingOrderQuery ||
    isLoadingOrder ||
    isFetchingOrder ||
    isLoadingRemoving ||
    isLoadingFinish;

  const discountForPositionWindow = useMemo(
    () =>
      isOpenDiscountForPosition ? (
        <OrderModalDiscountForPosition
          onClose={() => {
            setIsOpenDiscountForPosition(undefined);
          }}
          position={isOpenDiscountForPosition}
          onSave={(position) => editPositionByIndex(position)}
        />
      ) : null,
    [isOpenDiscountForPosition]
  );

  const discountForOrderWindow = useMemo(
    () =>
      isOpenDiscountForOrder ? (
        <OrderModalDiscountForOrder
          onClose={() => {
            setIsOpenDiscountForOrder(false);
          }}
          positions={positions}
          onSave={(discount) => {
            setDiscountForOrder(discount);
            setIsOpenDiscountForOrder(false);
            addOrUpdateOrder({
              p: positions,
              c: comment,
              t: tableId ?? 0,
              n: orderNumber ?? undefined,
              d: discount,
            });
          }}
        />
      ) : null,
    [isOpenDiscountForOrder]
  );

  const orderSplittingWindow = useMemo(
    () =>
      isOpenSplitting ? (
        <OrderModalSplitting
          onClose={() => {
            setIsOpenSplitting(false);
          }}
          positions={positions}
          onSplit={(indexesForNewOrder) => {
            const positionForManipulating = positions;
            addOrUpdateOrder({
              p: positionForManipulating.filter((p) => !indexesForNewOrder.includes(p.i ?? -5)),
              c: comment,
              t: tableId ?? 0,
              n: orderNumber ?? undefined,
              d: discountForOrder ?? undefined,
            }).then(() => {
              addOrUpdateOrder({
                p: positionForManipulating.filter((p) => indexesForNewOrder.includes(p.i ?? -5)),
                c: comment,
                t: tableId ?? 0,
                n: undefined,
                d: discountForOrder ?? undefined,
              });
            });
          }}
        />
      ) : null,
    [isOpenSplitting]
  );

  const orderCommentWindow = useMemo(
    () =>
      isOpenComment ? (
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
        />
      ) : null,
    [isOpenComment]
  );

  const orderTableChangeWindow = useMemo(
    () =>
      isOpenTableChange ? (
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
        />
      ) : null,
    [isOpenTableChange]
  );

  const orderFinishWindow = useMemo(
    () =>
      isOpenFinishing ? (
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
        />
      ) : null,
    [isOpenFinishing]
  );

  const positionRemoveDialog = useMemo(() => {
    if (positionForRemovingDialog === undefined) {
      return null;
    } else {
      const handleRemovePosition = () => {
        removePositionByIndex(positionForRemovingDialog?.i);
        setPositionForRemovingDialog(undefined);
      };
      const handleCancelRemovingPosition = () => setPositionForRemovingDialog(undefined);
      return (
        <DialogRests
          title={i18n.t("orders.areSure")}
          onClose={handleCancelRemovingPosition}
          buttons={[
            { title: i18n.t("orders.removePosition"), onClick: handleRemovePosition },
            { title: i18n.t("orders.cancel"), onClick: handleCancelRemovingPosition },
          ]}
        />
      );
    }
  }, [positionForRemovingDialog]);

  const orderRemoveDialog = useMemo(() => {
    if (orderNumberForRemovingDialog === undefined) {
      return null;
    } else {
      const handleRemoveOrder = () => {
        removeOrderByNumber({ orderNumber: orderNumberForRemovingDialog });
        setOrderNumberForRemovingDialog(undefined);
      };
      const handleCancelRemovingOrder = () => setOrderNumberForRemovingDialog(undefined);
      return (
        <DialogRests
          title={i18n.t("orders.areSure")}
          onClose={handleCancelRemovingOrder}
          buttons={[
            { title: i18n.t("orders.removeOrder"), onClick: handleRemoveOrder },
            { title: i18n.t("orders.cancel"), onClick: handleCancelRemovingOrder },
          ]}
        />
      );
    }
  }, [orderNumberForRemovingDialog]);

  const nothingBlock = useMemo(
    () => (!positions?.length ? <NothingBlock>{i18n.t("orders.emptyPositions")}</NothingBlock> : null),
    [positions?.length]
  );

  const listWithTotal = useMemo(
    () =>
      positions?.length ? (
        <ListWithTotal>
          <OrderModalList
            positions={positions}
            setPositionForDialog={setPositionForDialog}
            discountForOrder={discountForOrder}
          />
          <OrderModalTotalBlock positions={positions} discountInPercent={discountForOrder ?? undefined} />
        </ListWithTotal>
      ) : null,
    [positions, discountForOrder]
  );

  return (
    <ModalRests
      title={orderNumber ? i18n.t("orders.editTitle", { orderNumber }) : i18n.t("orders.newTitle")}
      onBack={() => setOrderNumber(undefined)}
      footerButton={getButtonForFooter()}
      moreButtons={orderNumber ? buttonsForOrder : undefined}
      moreTitle={i18n.t("orders.orderDialogTitle")}
    >
      <Loading isLoading={isLoading} />
      {positionModal}
      {positionDialog}
      {orderRemoveDialog}
      {positionRemoveDialog}
      {discountForPositionWindow}
      {discountForOrderWindow}
      {orderSplittingWindow}
      {orderCommentWindow}
      {orderFinishWindow}
      {orderTableChangeWindow}
      {nothingBlock}
      {listWithTotal}
    </ModalRests>
  );
};
