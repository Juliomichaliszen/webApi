import { getErrorMessage } from "./TranslateApiErrors";
import { toast } from "react-toastify";

/**
 * @param error
 * @param fallback
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getApiErrors(error: any, fallback?: string) {
  const apiError = error?.response?.data;

  if (apiError && apiError.code) {
    const friendlyMessage = getErrorMessage(apiError.code, apiError.message);
    toast.error(friendlyMessage);
  } else if (apiError && apiError.message) {
    toast.error(apiError.message);
  } else if (fallback) {
    toast.error(fallback);
  } else {
    console.log(error);
    toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
  }
}
