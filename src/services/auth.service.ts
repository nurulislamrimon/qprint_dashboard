import { authkey } from "@/constants/storageKey";
import { setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(authkey, accessToken as string);
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
