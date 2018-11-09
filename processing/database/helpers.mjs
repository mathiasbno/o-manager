import fetch from "node-fetch";

const defaultHeaders = {
  "Content-Type": "application/json; charset=utf-8"
};

const get = function(url, params) {
  return fetch(url, {
    methid: "GET",
    cache: "no-cache",
    headers: {
      ...defaultHeaders
    },
    ...params
  }).catch(error => console.error(error));
};

const post = function(url, data, params) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ...defaultHeaders
    },
    ...params
  });
};

export { get, post };
