import { API_URL } from "../config";

export const requestFiles = async (url: string, method: string, data: FileList) => {
  const token = JSON.parse(localStorage.getItem("restsReduxState") ?? "")?.auth?.user?.token;

  const formData = new FormData();

  for (let i = 0; i < data.length; i++) {
    formData.append(`files`, data[i]);
  }

  const response = await fetch(API_URL + url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.status >= 400) {
    // response.status === 401 && localStorage.setItem("restsToken", "");
    return response;
  }

  return response.json();
};
