import { FC } from "react";
import styled from "@emotion/styled";
import { IItem } from "../../../../back/types";
import { useAuth } from "../../Auth/Context";
import { useTranslation } from "react-i18next";
import List from "../../List";
import { TbMinus, TbPlus } from "react-icons/tb";
import { newPallet } from "../../../styles";

type Option = { n?: string; p?: number; q?: number };

const OptionsSelectListItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
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
  max-width: 30px;
  min-width: 30px;
  max-height: 30px;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  display: flex;
  background: ${newPallet.gray2};
  border-radius: 10px;
  svg {
    width: 18px;
    height: 18px;
    color: white;
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
  const { i18n } = useTranslation();

  return (
    <List
      items={optionsWithTranslations.map((o, i) => {
        let langName = position?.ot?.[i]?.find((t) => t.l === i18n.language)?.t;
        if (!langName || langName === "") {
          langName = o?.n;
        }
        return {
          description: `+${o?.p} ${symbol}`,
          title: (
            <OptionsSelectListItem>
              <OptionsSelectName>{langName}</OptionsSelectName>
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
                  <TbMinus />
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
                  <TbPlus />
                </OptionsSelectButton>
              </OptionsSelectButtonsBlock>
            </OptionsSelectListItem>
          ),
          onClick: () => {},
        };
      })}
      withPadding
    />
  );
};
