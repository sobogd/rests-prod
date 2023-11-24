import { OperationId, Request, Route, Security, Tags, Response, Get, Post, Body } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import listCategoriesForFilter from "../services/k/listCategoriesForFilter";
import listPositionsByCategories from "../services/k/listPositionsByCategories";
import type { IAllPositionsForKitchen } from "../types/k";
import restartPosition from "../services/k/restartPosition";
import donePosition from "../services/k/donePosition";

@Route("k")
export class KController {
  @Tags("K")
  @OperationId("List categories for filter")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("list-categories-for-filter")
  public async listCategoriesForFilter(@Request() req: IAuthRequest): Promise<{ n: string; i: number }[]> {
    return await listCategoriesForFilter(req?.user?.companyId);
  }
  @Tags("K")
  @OperationId("List positions by categories")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("list-positions-by-categories")
  public async listPositionsByCategories(@Request() req: IAuthRequest): Promise<IAllPositionsForKitchen[]> {
    return await listPositionsByCategories(req?.user?.companyId);
  }
  @Tags("K")
  @OperationId("Done position")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("done-position")
  public async donePosition(
    @Body() body: { orderNumber: number; positionIndex: number },
    @Request() req: IAuthRequest
  ): Promise<void> {
    await donePosition(body.orderNumber, body.positionIndex, req?.user?.companyId);
  }
  @Tags("K")
  @OperationId("Restart position")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("restart-position")
  public async restartPosition(
    @Body() body: { orderNumber: number; positionIndex: number },
    @Request() req: IAuthRequest
  ): Promise<void> {
    await restartPosition(body.orderNumber, body.positionIndex, req?.user?.companyId);
  }
}
