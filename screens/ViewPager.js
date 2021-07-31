import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { useSelector } from "react-redux";
import Home from "./Home";
import Profile from "./Profile";
import Logout from "./Logout";
import * as SplashScreen from "expo-splash-screen";

const ViewPager = (props) => {
  const user = useSelector((state) => state.user);

  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState({
    uid: "",
    email: "",
    displayName: "",
    visible: false,
    profileImageUrl: "",
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (Object.keys(user).length !== 0) {
          setUsers(user);
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    setUsers(user);
  }, [user]);

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  console.log(props.navigation);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <PagerView style={{ flex: 1 }} initialPage={0}>
        <View style={{ flex: 1 }} key="1">
          <Home user={users} navigation={props.navigation} />
        </View>
        <View style={{ flex: 1 }} key="2">
          <Profile user={users} />
        </View>
        <View style={{ flex: 1 }} key="3">
          <Logout user={users} />
        </View>
      </PagerView>
    </View>
  );
};

export default ViewPager;
