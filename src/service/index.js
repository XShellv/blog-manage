import { request } from "../utils/util";
class Service {
  fetchList(params) {
    const { pageSize, pageNo } = params;
    return request(`/api/post?pageSize=${pageSize}&pageNo=${pageNo}`);
  }
  publishPost(body) {
    const { id } = body;
    let url = id !== undefined ? `/api/post/${id}` : `/api/post`
    return request(url, {
      method: "POST",
      body,
    });
  }
  fetchPost(params) {
    return request(`/api/post/${params.id}`);
  }
}

export const service = new Service();
