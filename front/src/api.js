import axios from "axios";

const baseURL = "/api";

export function request(method, url, data, headers) {
  return axios({
    method,
    url: baseURL + url,
    data,
    headers,
  })
    .then((result) => result.data)
    .catch((error) => error);
}
