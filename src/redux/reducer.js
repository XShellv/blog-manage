import { actionTypes } from "./actions";

let initState = {
  userInfo: {},
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

export default reducer;
