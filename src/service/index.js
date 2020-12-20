import { request } from "../utils/util";
class Service {
  login(body) {
    let url = `/api/login`;
    const { remember, ...rest } = body;
    return request(url, {
      method: "POST",
      body: rest,
    });
  }

  fetchUser() {
    let url = "/api/admin/info";
    return request(url);
  }

  fetchPosts(params) {
    const { pageSize, pageNo } = params;
    return request(`/api/post?pageSize=${pageSize}&pageNo=${pageNo}`);
  }

  fetchDrafts(params) {
    const { pageSize, pageNo } = params;
    return request(`/api/draft?pageSize=${pageSize}&pageNo=${pageNo}`);
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

  fetchDraft(params) {
    return request(`/api/draft/${params.id}`);
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

  fetchUploadToken() {
    return request(`/api/token`, {
      method: "POST",
    });
  }

  fethcPics({ limit, marker }) {
    return request(`/api/prefix-list?limit=${limit}&marker=${marker}`);
  }

  delPic({ key }) {
    return request(`/api/qiniu-delele?key=${key}`, {
      method: "DELETE",
    });
  }

  deletePost({ id }) {
    return request(`/api/post/${id}`, {
      method: "DELETE",
    });
  }
}

export const service = new Service();
