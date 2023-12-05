import { CategoriesList } from "./features/Categories/CategoriesList";
import { Company } from "./features/Company/Company";
import { DayStats } from "./features/DayStats/DayStats";
import { ItemsList } from "./features/Items/ItemsList";
import { PeriodStats } from "./features/PeriodStats/PeriodStats";
import { Billing } from "./features/billing";
import { EPages } from "./features/common/enums";
import { Orders } from "./features/orders";
import { Users } from "./features/users";
import { Map } from "./features/map";
import { Kitchen } from "./features/kitchen";
import { Login } from "./features/login";
import {
  TbBasket,
  TbBuildingSkyscraper,
  TbCalculator,
  TbChartDonut,
  TbChartHistogram,
  TbLayoutList,
  TbMap,
  TbSitemap,
  TbToolsKitchen,
  TbUsers,
} from "react-icons/tb";

export const CMenuItems: {
  id: EPages;
  permissions: string[];
  component: any;
  icon: any;
  hideFromMenu?: boolean;
  group: "work" | "admin" | "stats" | "service";
}[] = [
  {
    id: EPages.BILLING,
    permissions: ["admin"],
    component: <Billing />,
    icon: <TbCalculator />,
    group: "service",
  },
  {
    id: EPages.POSITIONS,
    permissions: ["admin"],
    component: <ItemsList />,
    icon: <TbLayoutList />,
    group: "admin",
  },
  {
    id: EPages.TABLES,
    permissions: ["admin"],
    component: <Map />,
    icon: <TbMap />,
    group: "admin",
  },
  {
    id: EPages.CATEGORIES,
    permissions: ["admin"],
    component: <CategoriesList />,
    icon: <TbSitemap />,
    group: "admin",
  },
  {
    id: EPages.COMPANY,
    permissions: ["admin"],
    component: <Company />,
    icon: <TbBuildingSkyscraper />,
    group: "service",
  },
  {
    id: EPages.USERS,
    permissions: ["admin"],
    component: <Users />,
    icon: <TbUsers />,
    group: "admin",
  },
  {
    id: EPages.ORDERS,
    permissions: ["manager", "personal", "admin"],
    component: <Orders />,
    icon: <TbBasket />,
    group: "work",
  },
  {
    id: EPages.KITCHEN,
    permissions: ["manager", "kitchen", "admin", "personal"],
    component: <Kitchen />,
    icon: <TbToolsKitchen />,
    group: "work",
  },
  {
    id: EPages.DAY_STATS,
    permissions: ["manager", "kitchen", "admin", "personal"],
    component: <DayStats />,
    icon: <TbChartDonut />,
    group: "stats",
  },
  {
    id: EPages.PERIOD,
    permissions: ["admin"],
    component: <PeriodStats />,
    icon: <TbChartHistogram />,
    group: "stats",
  },
  {
    id: EPages.LOGIN,
    permissions: ["manager", "kitchen", "admin", "personal"],
    component: <Login />,
    icon: null,
    hideFromMenu: true,
    group: "service",
  },
];
