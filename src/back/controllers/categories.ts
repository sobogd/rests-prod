import { Body, OperationId, Post, Request, Response, Route, Security, Tags, Get, Path } from "tsoa";
import type { ICategory } from "../mappers/categories";
import type { IAuthRequest } from "../types";
import { searchCategories } from "../services/categories/searchCategories";
import { archiveCategory } from "../services/categories/archiveCategory";
import { updateCategory } from "../services/categories/updateCategory";
import { createCategory } from "../services/categories/createCategory";
import { ErrorResponse } from "./users";
import { IGetCategoryDetails, getCategoryDetails } from "../services/categories/getCategoryDetails";

@Route("categories")
export class CategoriesController {
  @Tags("CategoriesService")
  @OperationId("Search")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("search")
  public async search(@Request() { user }: IAuthRequest): Promise<ICategory[]> {
    return await searchCategories(user.companyId);
  }
  @Tags("CategoriesService")
  @OperationId("Create")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("create")
  public async create(@Body() request: ICategory, @Request() { user }: IAuthRequest): Promise<{}> {
    await createCategory(request, user.companyId);
    return {};
  }
  @Tags("CategoriesService")
  @OperationId("Update")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("update")
  public async update(@Body() request: ICategory): Promise<{}> {
    await updateCategory(request);
    return {};
  }
  @Tags("CategoriesService")
  @OperationId("Archive")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Post("archive")
  public async archive(@Body() request: { id: number }): Promise<{}> {
    await archiveCategory(request.id);
    return {};
  }
  @Tags("CategoriesService")
  @OperationId("GetCategoryDetails")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("get-category-details/{id}")
  public async getCategoryDetails(@Path() id: number): Promise<IGetCategoryDetails> {
    return await getCategoryDetails(id);
  }
}
