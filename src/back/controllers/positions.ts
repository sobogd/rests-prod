import { Body, Get, OperationId, Path, Post, Request, Response, Route, Security, Tags } from "tsoa";
import { searchPositions } from "../services/positions/searchPositions";
import * as types from "../types";
import { EPositionStatuses, IPosition } from "../mappers/positions";
import { createPosition } from "../services/positions/createPosition";
import { updatePosition } from "../services/positions/updatePosition";
import { archivePosition } from "../services/positions/archivePosition";
import { ErrorResponse } from "./users";
import { getPositionDetails, IGetPositionDetails } from "../services/positions/getPositionDetails";

export interface ICreatePositionRequest extends IPosition {
  categories: number[];
  composition: { elementId: number; weight: number }[];
  additional: number[];
  file?: string;
  isFileChanged?: boolean;
  translations: { code: string; name: string }[];
}

export interface IUpdatePositionRequest extends ICreatePositionRequest {
  id: number;
}

@Route("positions")
export class PositionsController {
  @Tags("PositionsService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: types.IAuthRequest): Promise<
    {
      composition: { weight: number; element: number }[];
      price: number;
      additional: { positionId: number }[];
      name: string;
      description?: string;
      isAdditional: boolean;
      id?: number;
      sort: number;
      categories: { categoryId: number }[];
      status?: EPositionStatuses;
    }[]
  > {
    return await searchPositions(user.companyId);
  }
  @Tags("PositionsService")
  @OperationId("Create")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(
    @Body() request: ICreatePositionRequest,
    @Request() { user }: types.IAuthRequest
  ): Promise<{}> {
    await createPosition(request, user.companyId);
    return {};
  }
  @Tags("PositionsService")
  @OperationId("Update")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(
    @Body() request: IUpdatePositionRequest,
    @Request() { user }: types.IAuthRequest
  ): Promise<{}> {
    await updatePosition(request, user.companyId);
    return {};
  }
  @Tags("PositionsService")
  @OperationId("Archive")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archivePosition(request.id);
    return {};
  }
  @Tags("PositionsService")
  @OperationId("GetPositionDetails")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("get-position-details/{id}")
  public async getPositionDetails(
    @Path() id: number
    // @Request() { user }: IAuthRequest
  ): Promise<IGetPositionDetails> {
    return await getPositionDetails(id);
  }
}
