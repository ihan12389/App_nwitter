import { firebaseInstance, dbService, authService } from "../Firebase.js";

// define types

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_VISIBLE = "UPDATE_VISIBLE";
export const UPDATE_NWEETOBJ = "UPDATE_NWEETOBJ";

export const UPLOAD_NAME = "UPLOAD_NAME";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const FETCH_POST = "FETCH_POST";

// actions

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = (password) => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const updateName = (displayName) => {
  return {
    type: UPDATE_NAME,
    payload: displayName,
  };
};

export const updateVisible = (visible) => {
  console.log("updateVisible 실행");
  return {
    type: UPDATE_VISIBLE,
    payload: visible,
  };
};

export const updateNweetObj = (nweetObj) => {
  console.log("updateNweetObj 실행");
  return {
    type: UPDATE_NWEETOBJ,
    payload: nweetObj,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await authService.signInWithEmailAndPassword(
        email,
        password
      );

      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid) => {
  console.log("getUser 실행!");
  return async (dispatch, getState) => {
    try {
      const user = await dbService.collection("users").doc(uid).get();

      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password, displayName } = getState().user;
      const response = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          displayName: displayName,
          visible: false,
        };

        response.user.updateProfile(user);
        dbService.collection("users").doc(response.user.uid).set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};
