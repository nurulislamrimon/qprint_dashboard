import { authkey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage(authkey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authkey);
  //   console.log(authLocalStorageData);
  if (authToken) {
    const decodeData = decodedToken(authToken);
    return decodeData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authkey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
