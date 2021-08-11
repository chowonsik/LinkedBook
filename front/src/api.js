import axios from "axios";

const baseURL = "/api";

export function request(method, url, data) {
  return axios({
    method,
    url: baseURL + url,
    data,
    headers: getHeader(),
  })
    .then((result) => result.data)
    .catch((error) => error);
}

// url : '/deals', params : {search: '어린왕자'}
export function requestGet(url, params) {
  const requestURL = getGetURL(url, params);
  return axios
    .get(requestURL, {
      headers: getHeader(),
    })
    .then((result) => result.data)
    .catch((error) => error);
}

export function requestDelete(url) {
  return axios({
    method: "delete",
    url: baseURL + url,
    headers: getHeader(),
  })
    .then((result) => result)
    .catch((error) => error);
}

function getHeader() {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  if (!loginUser) return {};
  const token = loginUser.accessToken;
  return {
    "X-ACCESS-TOKEN": token,
  };
}

function getGetURL(url, params) {
  let requestURL = baseURL + url;
  if (params) {
    requestURL += "?";
    for (const key in params) {
      const value = params[key];
      requestURL += `${key}=${value}&`;
    }
    requestURL = requestURL.slice(0, requestURL.length - 1);
  }
  return requestURL;
}
