import { Account, Elements } from "../../pages";
import { teal } from "@mui/material/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MapIcon from "@mui/icons-material/Map";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AppsIcon from "@mui/icons-material/Apps";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { MakeCashReport, HistoryCashReport } from "../../features/reports";
import { Login } from "../../features/login";
import { Users } from "../../features/users";
import { Map } from "../../features/map";
import { Billing } from "../../features/billing";
import { ItemsList } from "../../features/Items/ItemsList";
import { Orders } from "../../features/orders";
import { Kitchen } from "../../features/kitchen";
import { Statistic } from "../../features/statistic";
import { EPages } from "../../features/common/enums";
import { PeriodStats } from "../../features/PeriodStats/PeriodStats";
import { DayStats } from "../../features/DayStats/DayStats";

export const CPageComponents = {
  [EPages.AUTHORIZATION]: <Login />,
  [EPages.COMPANY]: <Account />,
  [EPages.ORDERS]: <Orders />,
  [EPages.TABLES]: <Map />,
  [EPages.ELEMENTS]: <Elements />,
  [EPages.CATEGORIES]: null,
  [EPages.KITCHEN]: <Kitchen />,
  [EPages.DAY_STATS]: <DayStats />,
  [EPages.PERIOD]: <PeriodStats />,
  [EPages.POSITIONS]: <ItemsList />,
  [EPages.USERS]: <Users />,
  [EPages.CASH_REPORT_MAKE]: <MakeCashReport />,
  [EPages.CASH_REPORT_HISTORY]: <HistoryCashReport />,
  [EPages.STATS]: <Statistic />,
  [EPages.BILLING]: <Billing />,
};

export const CPageIcons = {
  [EPages.AUTHORIZATION]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.COMPANY]: <AccountCircleIcon sx={{ color: teal[50] }} />,
  [EPages.ORDERS]: <ReceiptLongIcon sx={{ color: teal[50] }} />,
  [EPages.TABLES]: <MapIcon sx={{ color: teal[50] }} />,
  [EPages.ELEMENTS]: <AutoFixHighIcon sx={{ color: teal[50] }} />,
  [EPages.CATEGORIES]: <AppsIcon sx={{ color: teal[50] }} />,
  [EPages.KITCHEN]: <SoupKitchenIcon sx={{ color: teal[50] }} />,
  [EPages.POSITIONS]: <MenuBookIcon sx={{ color: teal[50] }} />,
  [EPages.USERS]: <GroupIcon sx={{ color: teal[50] }} />,
  [EPages.DAY_STATS]: <GroupIcon sx={{ color: teal[50] }} />,
  [EPages.PERIOD]: <GroupIcon sx={{ color: teal[50] }} />,
  [EPages.CASH_REPORT_MAKE]: <PublishedWithChangesIcon sx={{ color: teal[50] }} />,
  [EPages.CASH_REPORT_HISTORY]: <ManageHistoryIcon sx={{ color: teal[50] }} />,
  [EPages.STATS]: <TimelineIcon sx={{ color: teal[50] }} />,
  [EPages.BILLING]: <AccountBalanceWalletIcon sx={{ color: teal[50] }} />,
};
