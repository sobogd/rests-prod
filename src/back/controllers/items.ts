import { Body, OperationId, Request, Post, Route, Security, Tags, Response } from "tsoa";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import createItem from "../services/items/createItem";
import deleteItem from "../services/items/deleteItem";
import updateItem from "../services/items/updateItem";
import type { IItem } from "../mappers/items";
import getItem from "../services/items/getItem";
import listItems from "../services/items/listItems";

@Route("items")
export class ItemsController {
  @Tags("Items")
  @OperationId("Create")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: IItem, @Request() { user }: IAuthRequest): Promise<void> {
    return await createItem(request, user.companyId);
  }
  @Tags("Items")
  @OperationId("Update")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IItem, @Request() { user }: IAuthRequest): Promise<void> {
    return await updateItem(request, user.companyId);
  }
  @Tags("Items")
  @OperationId("Delete")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("delete")
  public async delete(
    @Body() { itemId }: { itemId: number },
    @Request() { user }: IAuthRequest
  ): Promise<void> {
    return await deleteItem(itemId, user.companyId);
  }
  @Tags("Items")
  @OperationId("ListForCategoryId")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("list")
  public async list(@Request() req: IAuthRequest): Promise<IItem[]> {
    return listItems(req?.user?.companyId);
  }
  @Tags("Items")
  @OperationId("Get")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("get")
  public async getById(@Body() { itemId }: { itemId: number }, @Request() req: IAuthRequest): Promise<IItem> {
    return await getItem(itemId, req?.user?.companyId);
  }
}
