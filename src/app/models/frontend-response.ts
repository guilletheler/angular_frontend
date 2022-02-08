import { ExceptionDetail } from "./exception-detail";

export class FrontendResponse<T> {
  status: string = '';
  currentDate: Date = Object();
  data: T = Object();
  exceptionDetail: ExceptionDetail = Object();
}
