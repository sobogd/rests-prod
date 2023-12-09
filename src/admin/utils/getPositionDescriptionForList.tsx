import styled from "@emotion/styled";
import i18n from "../i18n";
import { IPositionForOrder } from "../../back/types";
import { newPallet } from "../styles";

const PosForOrderTitleDiscount = styled.strong`
  font-weight: 400;
  float: right;
  background: ${newPallet.orange2};
  color: white;
  font-size: 14px;
  padding: 2px 7px;
  border-radius: 8px;
  height: 25px;
`;

const PosForOrderPricesDiscount = styled(PosForOrderTitleDiscount)`
  background: ${newPallet.orange1};
  height: 25px;
`;

const PosForOrderDescription = styled.div`
  width: 100%;
  p {
    margin-top: 5px;
    line-height: 25px;
    strong {
      background: ${newPallet.gray2};
      padding: 0 7px;
      height: 22px;
      color: white;
      float: left;
      line-height: 22px;
      margin-right: 5px;
    }
  }
  .options {
    margin: 5px 0;
  }
`;

export const getPositionDescriptionForList = (position: IPositionForOrder) => {
  let langNameVariant = position?.v?.t?.find((t) => t.l === i18n.language)?.t;
  if (!langNameVariant || langNameVariant === "") {
    langNameVariant = position?.v?.n;
  }
  return (
    <PosForOrderDescription>
      {position?.v ? <p>{langNameVariant}</p> : null}
      {position?.o?.length ? (
        <p className="options">
          {position?.o.map((po, i) => {
            let langName = po?.t?.find((t) => t.l === i18n.language)?.t;
            if (!langName || langName === "") {
              langName = po?.n;
            }
            return (
              <>
                <PosForOrderPricesDiscount>{po.q}x</PosForOrderPricesDiscount>
                {langName}
                <br />
              </>
            );
          })}
        </p>
      ) : null}
      {position?.c ? (
        <p>
          <span>{position.c}</span>
        </p>
      ) : null}
    </PosForOrderDescription>
  );
};
