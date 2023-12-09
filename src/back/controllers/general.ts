import { Get, OperationId, Response, Route, Tags } from "tsoa";

@Route("")
export class GeneralController {
  @Tags("GeneralService")
  @OperationId("Root")
  @Response(500, "Response with error")
  @Get("")
  public async search(): Promise<{ name: string }> {
    return { name: "rests system" };
  }
}
