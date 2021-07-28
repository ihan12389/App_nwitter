import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import SwitchNavigator from "./navigation/SwitchNavigator";
import reducer from "./reducers";

// 미들 웨어 생성
const middleware = applyMiddleware(thunkMiddleware);
// 스토어 생성
const store = createStore(reducer, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <SwitchNavigator />
    </Provider>
  );
}
