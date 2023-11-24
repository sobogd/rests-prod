import styled from "@emotion/styled";
import { FC, useMemo, useState } from "react";
import { CMenuItems } from "./FooterBar";
import { useTranslation } from "react-i18next";
import { DialogRests } from "./DialogRests";
import { useAppDispatch, useAppSelector } from "../app/store";
import { UniversalList, UniversalListItem, prePrimaryColor } from "../app/styles";
import { commonActions } from "../features/common/slice";

const MenuRestsContainer = styled.div`
  position: fixed;
  z-index: 250;
  top: 0;
  left: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  background: white;
  flex-direction: column;
  color: #3e3e3e;
`;

const MenuRestsHeader = styled.div`
  justify-content: center;
  background: ${prePrimaryColor};
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 7px 15px 15px;
`;

const MenuRestsCompanyTitle = styled.div`
  font-weight: 600;
  flex: 100%;
  color: white;
  font-size: 20px;
  p {
    margin-top: -3px;
    font-size: 15px;
    font-size: 15px;
    font-weight: 400;
    color: #eae2ff;
    max-width: calc(100vw - 120px);
    :nth-child(1) {
      margin-top: 2px;
    }
  }
`;

const MenuRestsLangButton = styled.div`
  width: 55px;
  height: 45px;
  min-width: 55px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  color: white;
  margin-right: 4px;
  ::after {
    content: "|";
    position: absolute;
    left: 100%;
    font-weight: 100;
    font-size: 12px;
    color: #ede7ff;
  }
`;

const MenuRestsCloseButton = styled.div`
  width: 45px;
  height: 45px;
  min-width: 45px;
  position: relative;
  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 2.7px;
    background: white;
    margin: auto;
    transform: rotate(-45deg);
    :nth-child(2) {
      transform: rotate(45deg);
    }
  }
`;

export const MenuRests: FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const lang = useAppSelector((s) => s.common.user?.company?.lang);
  const title = useAppSelector((s) => s.common.user?.company?.title);
  const email = useAppSelector((s) => s.common.user?.company?.email);
  const companyLogin = useAppSelector((s) => s.common.user?.company?.login);
  const userLogin = useAppSelector((s) => s.common.user?.login);
  const name = useAppSelector((s) => s.common.user?.name);
  const user = useAppSelector((s) => s.common.user);
  const [isOpenLangDialog, setIsOpenLangDialog] = useState<boolean>(false);

  const langDialog = useMemo(
    () =>
      isOpenLangDialog ? (
        <DialogRests
          onClose={() => {
            setIsOpenLangDialog(false);
          }}
          buttons={["en", "ru"].map((l) => ({
            title: l.toUpperCase(),
            onClick: () => {
              onClose();
              i18n.changeLanguage(l);
            },
          }))}
        />
      ) : null,
    [isOpenLangDialog]
  );

  return (
    <MenuRestsContainer>
      {isOpenLangDialog ? langDialog : null}
      <MenuRestsHeader>
        <MenuRestsCompanyTitle>
          {title}
          <p>
            Login: {companyLogin}-{userLogin}
          </p>
          <p>User: {name}</p>
          <p>{email}</p>
        </MenuRestsCompanyTitle>
        <MenuRestsLangButton
          onClick={() => {
            setIsOpenLangDialog(true);
          }}
        >
          {lang}
        </MenuRestsLangButton>
        <MenuRestsCloseButton onClick={() => onClose()}>
          <span></span>
          <span></span>
        </MenuRestsCloseButton>
      </MenuRestsHeader>
      <UniversalList style={{ width: "100%", overflowY: "auto" }}>
        {CMenuItems.filter((item) => item.permissions.includes(user?.type || "")).map((i) => (
          <UniversalListItem
            style={{ width: "100%", alignItems: "flex-start" }}
            onClick={() => {
              dispatch(commonActions.setActivePage(i.id));
              onClose();
            }}
          >
            {t(`menu.names.${i.id}`)}
          </UniversalListItem>
        ))}
        <UniversalListItem
          style={{ width: "100%", alignItems: "flex-start" }}
          onClick={() => {
            const elem = document.querySelector("body");
            if (elem?.requestFullscreen) {
              elem.requestFullscreen();
              // @ts-expect-error
            } else if (elem?.webkitRequestFullscreen) {
              /* Safari */
              // @ts-expect-error
              elem.webkitRequestFullscreen();
              // @ts-expect-error
            } else if (elem?.msRequestFullscreen) {
              /* IE11 */
              // @ts-expect-error
              elem.msRequestFullscreen();
            }
            onClose();
          }}
        >
          Full screen mode
        </UniversalListItem>
      </UniversalList>
    </MenuRestsContainer>
  );
};
