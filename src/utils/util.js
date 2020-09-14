import { notification } from "antd";
export function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  const errorText = response.statusText;
  notification.error({
    top: 100,
    message: `request error ${response.status}: ${response.url}`,
    description: errorText,
  });
  return response;
}

export function request(url, param) {
  const options = {
    credentials: "include",
    ...param,
  };

  const headers = {
    Accept: "application/json",
  };
  if (param && param.body) {
    if (typeof param.body === "string") {
      options.body = param.body;
    } else {
      options.body = JSON.stringify(param.body);
    }
    headers["Content-Type"] = "application/json;charset=UTF-8";
  }
  options.headers = headers;

  return fetch(url, options)
    .then(checkStatus)
    .then((response) => {
      // return response.status === 204 ? response.text() : response.json();
      if (options.method === "DELETE" || response.status === 204) {
        // return Promise.reject(response.text());
        const content = response.text();
        return {
          status: 200,
          message: content,
          content: [],
        };
      } else if (response.status === 401) {
        return {
          status: response.status,
          message: response.statusText,
          content: [],
        };
      }
      return response.json();
    });
}
