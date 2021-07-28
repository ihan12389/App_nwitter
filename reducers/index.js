import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_NAME,
  UPDATE_VISIBLE,
  UPDATE_NWEETOBJ,
  UPLOAD_NAME,
} from "../actions/user";

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_NAME:
      return { ...state, displayName: action.payload };
    case UPDATE_VISIBLE:
      return { ...state, visible: action.payload };
    case UPDATE_NWEETOBJ:
      return {
        ...state,
        nweetObj: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
