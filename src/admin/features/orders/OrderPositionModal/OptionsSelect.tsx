import { FC } from "react";
import styled from "@emotion/styled";
import { useAppSelector } from "../../../app/store";
import { IItem } from "../../../../back/types";
import { useAuth } from "../../Auth/Context";

type Option = { n?: string; p?: number; q?: number };

const OptionsSelectListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  border-bottom: 1px solid #eeeeee;
  padding: 15px 20px;
  width: 100%;
  :last-child {
    border: 0;
  }
`;

const OptionsSelectName = styled.div`
  font-size: 17px;
  font-weight: 600;
`;

const OptionsSelectButtonsBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 86px;
  min-width: 86px;
  max-width: 86px;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 17px;
    line-height: 17px;
    padding-right: 1px;
    font-weight: 600;
  }
`;

const OptionsSelectButton = styled.button`
  width: 35px;
  min-width: 35px;
  height: 35px;
  position: relative;
  margin: -10px;
  padding: 10px;
  b,
  span {
    background: #845ef0;
    position: absolute;
    top: 0;
    left: 0px;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  b {
    width: 14px;
    height: 3px;
    border-radius: 4px;
    :nth-child(2) {
      transform: rotate(90deg);
    }
  }
  span {
    height: 14px;
    width: 3px;
    border-radius: 4px;
  }
`;

export const OptionsSelect: FC<{
  position?: IItem;
  options?: Option[];
  handleChangeOptions: (options: Option[]) => void;
}> = ({ position, options, handleChangeOptions }) => {
  const optionsWithTranslations: Option[] =
    position?.o?.map((o, index) => {
      return { ...o, t: position.ot?.[index] };
    }) ?? [];
  const symbol = useAuth()?.whoami?.company?.symbol;

  return (
    <>
      {optionsWithTranslations?.map((o) => (
        <OptionsSelectListItem>
          <OptionsSelectName>
            {o?.n} (+{o?.p}
            {symbol})
          </OptionsSelectName>
          <OptionsSelectButtonsBlock>
            <OptionsSelectButton
              onClick={() => {
                const nowQuantity = options?.find((oi) => oi.n === o.n)?.q ?? 0;
                if (nowQuantity === 1) {
                  handleChangeOptions((options ?? []).filter((oi) => oi.n !== o.n));
                } else {
                  handleChangeOptions(
                    (options ?? []).map((oi) => ({ ...oi, q: oi.n === o.n ? (oi.q ?? 1) - 1 : oi.q }))
                  );
                }
              }}
            >
              <b></b>
            </OptionsSelectButton>
            <span>{options?.find((oi) => oi.n === o.n)?.q ?? 0}</span>
            <OptionsSelectButton
              onClick={() => {
                const isOptionAdded = !!options?.find((oi) => oi.n === o.n);
                if (isOptionAdded) {
                  handleChangeOptions(
                    (options ?? []).map((oi) => ({ ...oi, q: oi.n === o.n ? (oi.q ?? 1) + 1 : oi.q }))
                  );
                } else {
                  handleChangeOptions([...(options ?? []), { ...o, q: 1 }]);
                }
              }}
            >
              <b></b>
              <b></b>
            </OptionsSelectButton>
          </OptionsSelectButtonsBlock>
        </OptionsSelectListItem>
      ))}
    </>
  );
};
