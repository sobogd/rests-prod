import { OperationId, Request, Route, Security, Tags, Response, Get, Body, Post } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import { IItem } from "../mappers/items";
import listCategoriesWithPositions from "../services/o/listCategoriesWithPositions";
import addOrUpdateOrder from "../services/o/addOrUpdateOrder";
import listOrdersForTable from "../services/o/listOrdersForTable";
import orderByNumber from "../services/o/orderByNumber";
import removeOrderByNumber from "../services/o/removeOrderByNumber";
import finishOrderByNumber from "../services/o/finishOrderByNumber";
import type { IOrder } from "../types/o";
import tablesWithOrders from "../services/o/tablesWithOrders";

@Route("o")
export class OController {
  @Tags("O")
  @OperationId("List categories with positions")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("list-categories-with-positions")
  public async listCategoriesWithPositions(
    @Request() req: IAuthRequest
  ): Promise<{ c: string; i: IItem[] }[]> {
    return await listCategoriesWithPositions(req?.user?.companyId);
  }
  @Tags("O")
  @OperationId("Add or update order")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("add-or-update-order")
  public async addOrUpdateOrder(@Body() body: IOrder, @Request() req: IAuthRequest): Promise<number> {
    return addOrUpdateOrder(body, req.user.companyId);
  }
  @Tags("O")
  @OperationId("List orders for table")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("list-orders-for-table")
  public async listOrdersForTable(
    @Body() body: { tableId: number },
    @Request() req: IAuthRequest
  ): Promise<IOrder[]> {
    return listOrdersForTable(body.tableId, req.user.companyId);
  }
  @Tags("O")
  @OperationId("Order by number")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("order-by-number")
  public async orderByNumber(
    @Body() body: { orderNumber: number },
    @Request() req: IAuthRequest
  ): Promise<IOrder> {
    return orderByNumber(body.orderNumber, req.user.companyId);
  }
  @Tags("O")
  @OperationId("Remove order by number")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("remove-order-by-number")
  public async removeOrderByNumber(
    @Body() body: { orderNumber: number },
    @Request() req: IAuthRequest
  ): Promise<void> {
    return removeOrderByNumber(body.orderNumber, req.user.companyId);
  }
  @Tags("O")
  @OperationId("Finish order by number")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("finish-order-by-number")
  public async finishOrderByNumber(
    @Body() body: { orderNumber: number; paymentMethod: string },
    @Request() req: IAuthRequest
  ): Promise<void> {
    return finishOrderByNumber(body.orderNumber, body.paymentMethod, req.user.companyId);
  }
  @Tags("O")
  @OperationId("Tables with orders")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("tables-with-orders")
  public async tablesWithOrders(@Request() req: IAuthRequest): Promise<{ t: number; f?: boolean }[]> {
    return tablesWithOrders(req.user.companyId);
  }
}
