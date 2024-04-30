import { IError, IGenericErrorMessage } from "@/types";
import { toast } from "react-toastify";

export const showError = (error: IError | unknown) => {
  if (error && typeof error === "object" && "data" in error) {
    const err = error.data as {
      message: string;
      errorMessages: Array<IGenericErrorMessage>;
    };
    if (err?.errorMessages) {
      err.errorMessages.forEach((msg) => {
        toast.error(msg.message);
      });
    } else if (err?.message) {
      toast.error(err?.message);
    } else if (typeof err === "string") {
      toast.error(err);
    }
  } else if (typeof error === "string") {
    toast.error(error);
  }
};
