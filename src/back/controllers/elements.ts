import { Body, OperationId, Post, Request, Response, Route, Security, Tags } from "tsoa";
import { archiveElement } from "../services/elements/archiveElement";
import type { IElement } from "../mappers/elements";
import { updateElement } from "../services/elements/updateElement";
import { createElement } from "../services/elements/createElement";
import type { IAuthRequest } from "../types";
import { searchElements } from "../services/elements/searchElements";
import { ErrorResponse } from "./users";

@Route("elements")
export class ElementsController {
  @Tags("ElementsService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<IElement[]> {
    return await searchElements(user.companyId);
  }
  @Tags("ElementsService")
  @OperationId("Create")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: IElement, @Request() { user }: IAuthRequest): Promise<{}> {
    await createElement(request, user.companyId);
    return {};
  }
  @Tags("ElementsService")
  @OperationId("Update")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: IElement): Promise<{}> {
    await updateElement(request);
    return {};
  }
  @Tags("ElementsService")
  @OperationId("Archive")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveElement(request.id);
    return {};
  }
}
