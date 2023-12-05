import { store } from "../app/store";
import { API_URL } from "../config";
import { commonActions } from "../features/common/slice";
import { Notice } from "../hooks/useNotification";

export interface IErrorResponse {
  rejectValue: { fields?: string[]; message?: string; code?: string };
}

export const getToken = () => `Bearer ${localStorage.getItem("token") ?? ""}`;

export const request = async (url: string, method: string, data?: object) => {
  const response = await fetch(API_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).catch((e) => {
    Notice.error("Error with request");
    throw new Error("Unauthorized");
  });

  const jsonResponse = await response.json();

  if (response.status === 401) {
    Notice.error("Unauthorized");
    store.dispatch(commonActions.signOut());
  }
  if (response.status >= 400) {
    Notice.error(jsonResponse?.message || "Error with request");
    throw new Error(jsonResponse?.message || "Error with request");
  }

  return jsonResponse;
};
