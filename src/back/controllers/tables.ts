import {
  OperationId,
  Post,
  Route,
  Security,
  Tags,
  UploadedFiles,
  File,
  Body,
  Request,
  Response,
  Get,
} from "tsoa";
import { uploadImage } from "../services/tables/uploadImage";
import * as types from "../types";
import * as tables from "../mappers/tables";
import { findImage } from "../services/tables/findImage";
import { searchTables } from "../services/tables/searchTables";
import { createTable } from "../services/tables/createTable";
import { updateTable } from "../services/tables/updateTable";
import { archiveTable } from "../services/tables/archiveTable";
import { ErrorResponse } from "./users";

@Route("tables")
export class TablesController {
  @Tags("TablesService")
  @OperationId("uploadImage")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("uploadImage")
  public async uploadImage(
    @UploadedFiles() files: File[],
    @Request() { user }: types.IAuthRequest
  ): Promise<{}> {
    await uploadImage(files[0], user.companyId);
    return {};
  }
  @Tags("TablesService")
  @OperationId("findImage")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("findImage")
  public async findImage(@Request() { user }: types.IAuthRequest): Promise<tables.ITableImageResponse> {
    return await findImage(user.companyId);
  }
  @Tags("TablesService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: types.IAuthRequest): Promise<tables.ITable[]> {
    return await searchTables(user.companyId);
  }
  @Tags("TablesService")
  @OperationId("Create")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: tables.ITable, @Request() { user }: types.IAuthRequest): Promise<{}> {
    await createTable(request, user.companyId);
    return {};
  }
  @Tags("TablesService")
  @OperationId("Update")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: tables.ITable): Promise<{}> {
    await updateTable(request);
    return {};
  }
  @Tags("TablesService")
  @OperationId("Archive")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveTable(request.id);
    return {};
  }
}
