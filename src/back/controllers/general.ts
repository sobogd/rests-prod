import { Get, OperationId, Response, Route, Tags } from "tsoa";
import { ErrorResponse } from "./users";

@Route("")
export class GeneralController {
  @Tags("GeneralService")
  @OperationId("Root")
  @Response<ErrorResponse>(500, "Response with error")
  @Get("")
  public async search(): Promise<{ name: string }> {
    return { name: "rests system" };
  }
}
