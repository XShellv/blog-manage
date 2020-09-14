import { request } from "../utils/util";
class Service {
  fetchList(params) {
    const { pageSize, pageNo } = params;
    return request(`/api/post?pageSize=${pageSize}&pageNo=${pageNo}`);
  }
  fetchPost(body) {
    return request(`/api/post`, {
      method: "POST",
      body,
    });
  }
}

export const service = new Service();
