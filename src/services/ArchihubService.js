import { URL_API, PAGE_SIZE } from "../config/const";

export function search(filters = {}) {
  var myHeaders = new Headers({ "Content-Type": "application/json" });

  var miInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(filters),
  };

  const path = "/search/public";

  return fetch(URL_API + path, miInit).then(function (response) {
    if (response.status !== 200) {
      return Promise.reject(response.status);
    } else {
      return response.json();
    }
  });
}