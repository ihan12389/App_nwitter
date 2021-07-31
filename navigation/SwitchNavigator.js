import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import Enter from "../screens/Enter";
import Profile from "../screens/Profile";
import ViewPager from "../screens/ViewPager";

const SwitchNavigator = createSwitchNavigator(
  {
    Login: {
      screen: Login,
    },
    Signup: {
      screen: Signup,
    },
    Home: {
      screen: Home,
    },
    Enter: {
      screen: Enter,
    },
    ViewPager: {
      screen: ViewPager,
    },
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(SwitchNavigator);
