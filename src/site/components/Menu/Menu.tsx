import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Title } from "../../styles";
import { useCompanyQuery } from "../../api";
import {
  Categories,
  Category,
  Position,
  PositionBottom,
  PositionImageContainer,
  PositionPrice,
  PositionTitle,
  PositionVariants,
  Positions,
} from "./styles";
import { IMAGE_URL } from "../../config";
import { MdOutlineNoPhotography } from "react-icons/md";
import { useTranslation } from "react-i18next";

export const Menu: FC = () => {
  const login = useParams()?.login ?? "";
  const { data } = useCompanyQuery(login);
  const { i18n } = useTranslation();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.categoriesWithPositions?.length) {
      setActiveCategoryIndex(0);
    }
  }, [data]);

  const itemsForCategory = useMemo(() => {
    if (activeCategoryIndex !== null && data?.categoriesWithPositions?.[activeCategoryIndex]?.i) {
      return data?.categoriesWithPositions?.[activeCategoryIndex]?.i;
    }
    return [];
  }, [data, activeCategoryIndex]);

  return (
    <>
      <Title>{i18n.t("menuTitle")}</Title>
      <Categories>
        {data?.categoriesWithPositions?.map((category, index) => {
          let title = category?.t?.find((p) => p.l === i18n.language)?.t;
          if (!title || title === "") {
            title = category.c;
          }
          return (
            <Category active={index === activeCategoryIndex} onClick={() => setActiveCategoryIndex(index)}>
              {title}
            </Category>
          );
        })}
      </Categories>
      <Positions>
        {itemsForCategory.map((position) => {
          let title = position?.t?.find((p) => p.l === i18n.language)?.t;
          if (!title || title === "") {
            title = position.n;
          }
          return (
            <Position key={position.id}>
              <PositionImageContainer>
                {position.f != null ? <img src={`${IMAGE_URL}${position.f}`} /> : <MdOutlineNoPhotography />}
              </PositionImageContainer>
              <PositionTitle>{title}</PositionTitle>
              {position?.v?.length ? (
                <PositionVariants>
                  {position?.v?.map((variant, i) => {
                    let title = position?.vt?.[i]?.find((t) => t.l === i18n.language)?.t;
                    if (!title || title === "") {
                      title = variant?.n;
                    }
                    return <li>{title}</li>;
                  })}
                </PositionVariants>
              ) : null}
              <PositionBottom>
                <PositionPrice>
                  {position.p} {data?.currency_symbol}
                </PositionPrice>
                {/* <PositionAddToCart>
                  <TbPlus />
                </PositionAddToCart> */}
              </PositionBottom>
            </Position>
          );
        })}
      </Positions>
    </>
  );
};
