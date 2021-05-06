import { GeneralError } from "./GeneralError";

export class NotFound extends GeneralError {
  constructor(message: string) {
    super(message, 404);
  }
}
