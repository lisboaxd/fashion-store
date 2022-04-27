import { toast } from "react-toastify";
import { HTTPConstants } from "../../app/constants/http.constants";

export class ToastProvider {
  private static _instance: ToastProvider;

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public httpRequestError = (error: any) => {
    if (error.response !== undefined) {
      if (error.response.status === HTTPConstants.BAD_REQUEST) {
        this.warning(error.response.data[0] ?? "An error occurred");
      } else if (error.response.status === HTTPConstants.UNAUTHORIZED) {
        this.warning("feedback.invalid_email_or_password");
      } else {
        this.error("An error occurred");
      }
    } else {
      this.error("An error occurred");
    }
  };

  public success = (message?: string) => {
    toast.success(message ?? "Your request was successful");
  };

  public error = (message?: string) => {
    toast.error(message ?? "An error occurred");
  };

  public warning = (message?: string) => {
    toast.warning(message ?? "An error occurred");
  };
}
