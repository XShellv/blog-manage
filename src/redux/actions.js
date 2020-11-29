export const actionTypes = {
  SET_USER: "SET_USER",
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function setUser(data) {
  return { type: actionTypes.SET_USER, payload: data };
}

export function setTopTags(data) {
  return { type: actionTypes.SET_TOPTAGS, payload: data };
}

export function authAdmin(data) {
  return { type: actionTypes.AUTH_ADMIN, payload: data };
}

export function setLoading(data) {
  return { type: actionTypes.SET_LOADING, payload: data };
}

export function setStatus(data) {
  return { type: actionTypes.SET_STATUS, payload: data };
}

export function initStatus() {
  return { type: actionTypes.INIT_STATUS };
}

export function login(url) {
  return { type: actionTypes.LOGIN, url };
}

// export function tickClock(isServer) {
//   return {
//     type: actionTypes.TICK_CLOCK,
//     light: !isServer,
//     ts: Date.now(),
//   };
// }
