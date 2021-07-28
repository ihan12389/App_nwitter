import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7-jd-_VfwiBXESzO-PUU_FOR7aRtD48w",
  authDomain: "nwitter-79fb0.firebaseapp.com",
  projectId: "nwitter-79fb0",
  storageBucket: "nwitter-79fb0.appspot.com",
  messagingSenderId: "755424085291",
  appId: "1:755424085291:web:d3b15de812656adf63316e",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();

dbService.settings({
  timestampsInSnapshots: true,
});
