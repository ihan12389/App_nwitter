import React, { useEffect, useState, useCallback } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { View } from "react-native";
import SwitchNavigator from "./navigation/SwitchNavigator";
import reducer from "./reducers";
import StackNavigator from "./navigation/StackNavigator";
import * as SplashScreen from "expo-splash-screen";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        {/* <SwitchNavigator /> */}
        <StackNavigator />
      </View>
    </Provider>
  );
}
