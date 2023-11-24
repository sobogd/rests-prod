import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { SyntheticEvent } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { teal } from "@mui/material/colors";
import { useTranslation } from "react-i18next";
import { CPageIcons } from "../app/consts";
import { useAppDispatch, useAppSelector } from "../app/store";
import { EPages } from "../features/common/enums";
import { commonActions } from "../features/common/slice";

export interface IMenuItem {
  id: EPages;
  permissions: string[];
}

export const CMenuItems: IMenuItem[] = [
  {
    id: EPages.BILLING,
    permissions: ["admin"],
  },
  {
    id: EPages.POSITIONS,
    permissions: ["admin"],
  },
  {
    id: EPages.TABLES,
    permissions: ["admin"],
  },
  {
    id: EPages.CATEGORIES,
    permissions: ["admin"],
  },
  {
    id: EPages.USERS,
    permissions: ["admin"],
  },
  {
    id: EPages.ORDERS,
    permissions: ["manager", "personal", "admin"],
  },
  {
    id: EPages.KITCHEN,
    permissions: ["manager", "kitchen", "admin", "personal"],
  },
  {
    id: EPages.DAY_STATS,
    permissions: ["manager", "kitchen", "admin", "personal"],
  },
  {
    id: EPages.PERIOD,
    permissions: ["admin"],
  },
  {
    id: EPages.STATS,
    permissions: ["admin"],
  },
  {
    id: EPages.CASH_REPORT_HISTORY,
    permissions: ["admin"],
  },
  {
    id: EPages.CASH_REPORT_MAKE,
    permissions: ["admin", "manager", "personal"],
  },
];

export const FooterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { user, activePage } = useAppSelector((s) => s.common);

  const handleChangePage = (_: SyntheticEvent, newValue: EPages) => {
    newValue != null && dispatch(commonActions.setActivePage(newValue));
  };

  const handleSignOut = () => {
    dispatch(commonActions.signOut());
  };

  const renderListItem = (id: EPages) => (
    <BottomNavigationAction key={id} value={id} label={t(`menu.names.${id}`)} icon={CPageIcons[id]} />
  );

  return (
    <BottomNavigation showLabels value={activePage} onChange={handleChangePage}>
      {CMenuItems.filter((item) => item.permissions.includes(user?.type || "")).map((i) =>
        renderListItem(i.id)
      )}
      <BottomNavigationAction
        onClick={handleSignOut}
        label={t("menu.names.logout")}
        icon={<LogoutIcon sx={{ color: teal[50] }} />}
      />
    </BottomNavigation>
  );
};
