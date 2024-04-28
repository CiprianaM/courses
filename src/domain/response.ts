import { Code } from '../enum/code.enum';
import { Status } from '../enum/status.enum';

export class HttpResponse {
  private timeStamp = new Date().toLocaleString();
  constructor(
    private statusCode: Code,
    private httpStatus: Status,
    private message: string,
    private data?: {}
  ) {}
}
