import { request } from "../utils/util";
class Service {
  fetchList(params) {
    const { pageSize, pageNo } = params;
    return request(`/api/post?pageSize=${pageSize}&pageNo=${pageNo}`);
  }

  publishPost(body) {
    const { id } = body;
    let url = id !== undefined ? `/api/post/${id}` : `/api/post`;
    return request(url, {
      method: "POST",
      body,
    });
  }

  fetchPost(params) {
    return request(`/api/post/${params.id}`);
  }

  fetchAbout() {
    return request(`/api/me`);
  }

  updateAbout(body) {
    return request(`/api/me`, {
      method: "POST",
      body,
    });
  }

  deletePost({ id }) {
    return request(`/api/post/${id}`, {
      method: "DELETE",
    });
  }
}

export const service = new Service();
