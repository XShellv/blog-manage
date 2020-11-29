import { createStore, compose } from "redux";
import reducer from "./reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // 引入redux-devtools-extension
const store = createStore(reducer,composeEnhancers()); // 调用createStore方法，该方法传递一个函数reducer
export default store;
