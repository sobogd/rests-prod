import styled from "@emotion/styled";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../app/store";
import { WindowRests } from "../../../shared/WindowRests";
import { prePrimaryColor } from "../../../app/styles";
import { usePaymentMethodsQuery } from "../api";
import Loading from "../../../shared/loading";

const DiscountForOrderTitle = styled.div`
  width: 100%;
  padding: 15px 20px;
  background: ${prePrimaryColor};
  font-weight: 600;
  font-size: 20px;
  color: white;
`;

const SplitButton = styled.button`
  width: calc(100% - 40px);
  background: #cf7ff8;
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin: 5px 15px 15px;
  border-radius: 10px;
  height: 45px;
`;

const SplittingList = styled.div`
  max-height: calc(90vh - 100px);
  overflow-y: scroll;
  width: 100%;
  padding: 5px 20px;
`;

const SplittingItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ede7ff;
  :last-child {
    border-bottom: 0;
  }
`;

const PaymentMethodName = styled.div`
  width: 100%;
  font-size: 15px;
  font-weight: 600;
  padding: 8px 15px;
  p {
    font-weight: 400;
    font-size: 15px;
    color: gray;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 5px;
  outline: none;
`;

const InputPaymentMethod = styled.input`
  overflow: hidden;
  border-radius: 5px;
  outline: none;
  width: 100%;
  padding: 8px 20px;
  border: 1px solid #ede7ff;
  margin-bottom: 5px;
`;

export const OrderModalFinish: FC<{
  onClose: () => void;
  onFinish: (paymentMethod: string) => void;
}> = ({ onClose, onFinish }) => {
  const i18n = useTranslation();
  const [inputtedPaymentMethod, setInputtedPaymentMethod] = useState<string>("");
  const [isOpenCustomMethod, setIsOpenCustomMethod] = useState<boolean>(false);
  const { data: paymentMethods, isLoading, isFetching } = usePaymentMethodsQuery();

  return (
    <WindowRests
      onClose={() => {
        onClose();
      }}
    >
      <Loading isLoading={isLoading || isFetching} />
      <DiscountForOrderTitle>{i18n.t("orders.selectMethod")}</DiscountForOrderTitle>
      <SplittingList>
        {paymentMethods?.map((paymentMethod) => (
          <SplittingItem>
            <Checkbox
              type="checkbox"
              checked={inputtedPaymentMethod === paymentMethod.title && isOpenCustomMethod === false}
              onChange={() => {
                setInputtedPaymentMethod(paymentMethod.title);
                setIsOpenCustomMethod(false);
              }}
            />
            <PaymentMethodName
              onClick={() => {
                setInputtedPaymentMethod(paymentMethod.title);
                setIsOpenCustomMethod(false);
              }}
            >
              {paymentMethod.title}
              <p>{paymentMethod.description}</p>
            </PaymentMethodName>
          </SplittingItem>
        ))}
        <SplittingItem style={{ borderBottom: 0 }}>
          <Checkbox
            type="checkbox"
            checked={isOpenCustomMethod === true}
            onChange={() => {
              setIsOpenCustomMethod(true);
              setInputtedPaymentMethod("");
            }}
          />
          <PaymentMethodName
            onClick={() => {
              setIsOpenCustomMethod(true);
              setInputtedPaymentMethod("");
            }}
          >
            {i18n.t("orders.customMethod")}
          </PaymentMethodName>
        </SplittingItem>
        {isOpenCustomMethod === true ? (
          <InputPaymentMethod
            value={inputtedPaymentMethod}
            placeholder={i18n.t("orders.customMethodInput")}
            onChange={(e) => {
              setInputtedPaymentMethod(e.target.value ?? "");
            }}
          />
        ) : null}
      </SplittingList>
      <SplitButton
        onClick={() => {
          if (inputtedPaymentMethod !== "") {
            onFinish(inputtedPaymentMethod);
            onClose();
          }
        }}
      >
        {i18n.t("orders.finishButton")}
      </SplitButton>
    </WindowRests>
  );
};
