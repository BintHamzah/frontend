import { userFetcher } from "@/helpers";
import { Dispatch } from "redux";
import { CREATE_USER } from "../user/user.queries";
import { CLEAR_ACCOUNT, CREATE_ACCOUNT, SET_LOADING } from "./account.types";

type AccountType = {
  email: string;
  fullName: string;
  password1: string;
  password2: string;
};

// loading
export function setLoading() {
  return {
    type: "SET_LOADING",
    payload: true,
  };
}

export function createUserAccount(account: AccountType, onSuccess?: (data: any) => void) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      const result = await userFetcher(CREATE_USER, account);
      console.log({ result });
      import("antd").then(antd => {
        antd.message.success(result.createUser.message);
      });
      dispatch({
        type: CREATE_ACCOUNT,
        payload: { ...result.createUser, email: account.email },
      });
      if (onSuccess) {
        onSuccess(result.createUser);
      }
    } catch (err) {
      import("antd").then(antd => {
        antd.message.error(err.message.slice(0, err.message.indexOf(".")));
      });
    }
  };
}

export function clearAccount() {
  return {
    type: CLEAR_ACCOUNT,
    payload: null,
  };
}

export const logout = () => ({
  type: CLEAR_ACCOUNT,
  payload: null,
});
