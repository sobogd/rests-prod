import { Get, OperationId, Route, Tags, Query, Response } from "tsoa";
import { ErrorResponse } from "./users";
import { updatePublicMenuForCompany } from "../services/menu/updatePublicMenuForCompany";
import { getPublicMenuForCompany } from "../services/menu/getPublicMenuForCompany";

export interface IPublicMenuItem {
  id: number;
  name: string;
  price: number;
  photo?: string;
  multipleChoice?: boolean;
  t: { code: string; title: string }[];
  add: {
    id: number;
    name: string;
    price: number;
    t: { code: string; title: string }[];
  }[];
}

export interface IPublicMenuCategory {
  id: number;
  name: string;
  t: { code: string; title: string }[];
  items: IPublicMenuItem[];
}

@Route("menu")
export class MenuController {
  @Tags("MenuService")
  @Response<ErrorResponse>(500, "Response with error")
  @OperationId("UpdatePublicMenuForCompany")
  @Get("update/{companyId}")
  public async updatePublicMenuForCompany(
    @Query() companyId: number
  ): Promise<void> {
    await updatePublicMenuForCompany(companyId);
  }
  @Tags("MenuService")
  @Response<ErrorResponse>(500, "Response with error")
  @OperationId("UpdatePublicMenuForCompany")
  @Get("get/{companyId}")
  public async getPublicMenuForCompany(
    @Query() companyId: number
  ): Promise<IPublicMenuCategory[]> {
    return await getPublicMenuForCompany(companyId);
  }
}
