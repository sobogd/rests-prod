import { Body, OperationId, Request, Post, Route, Security, Tags, Response, Get } from "tsoa";
import type {
  AuthorizationRequest,
  AuthorizationResponse,
  HashAuthorizationRequest,
  IUser,
} from "../mappers/users";
import getUsersByCompanyLogin from "../services/companies/getUsersByCompanyLogin";
import registration from "../services/auth/registration";
import { ErrorResponse } from "./users";
import type { IAuthRequest } from "../types";
import whoAmI from "../services/users/whoAmI";
import authorization from "../services/users/authorization";
import type { ICompany, IRegistrationRequest } from "../mappers/comapnies";
import hashAuthorization from "../services/users/hashAuthorization";

@Route("auth")
export class CompaniesController {
  @Tags("AuthService")
  @OperationId("Authorization")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Post("authorization")
  public async authorization(@Body() request: AuthorizationRequest): Promise<AuthorizationResponse> {
    return await authorization(request);
  }

  @Tags("AuthService")
  @OperationId("HashAuthorization")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Post("hash-authorization")
  public async hashAuthorization(@Body() request: HashAuthorizationRequest): Promise<AuthorizationResponse> {
    return await hashAuthorization(request);
  }

  @Tags("AuthService")
  @OperationId("whoAmI")
  @Response<ErrorResponse>(500, "Response with error")
  @Response<ErrorResponse>(401, "Unauthorized request response")
  @Security("Bearer", ["AuthService"])
  @Get("whoami")
  public async whoami(@Request() { user }: IAuthRequest): Promise<IUser> {
    return await whoAmI(user.id);
  }
  @Tags("AuthService")
  @OperationId("getUsersByCompanyLogin")
  @Response<ErrorResponse>(500, "Response with error")
  @Post("getUsersByCompanyLogin")
  public async getUsersByCompanyLogin(
    @Body()
    body: {
      companyLogin: string;
    }
  ): Promise<IUser[] | { isSuccess: boolean; message?: string }> {
    return await getUsersByCompanyLogin(body.companyLogin);
  }
  @Tags("AuthService")
  @OperationId("registration")
  @Response<ErrorResponse>(500, "Response with error")
  @Post("registration")
  public async registration(
    @Body()
    request: IRegistrationRequest
  ): Promise<ICompany> {
    return await registration(request);
  }
}
