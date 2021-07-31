import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Enter from "../screens/Enter";
import ViewPager from "../screens/ViewPager";
import { useSelector, useDispatch } from "react-redux";
import { authService } from "../Firebase";
import { getUser } from "../actions/user";
import { Text } from "react-native";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [init, setInit] = useState(false);
  const [login, setLogin] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((User) => {
      if (User) {
        dispatch(getUser(User.uid));
        if (user != null) {
          console.log("로그인 됨!");
          setLogin(true);
        }
      } else {
        setLogin(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <NavigationContainer>
      {!init ? (
        <Text>Loading...</Text>
      ) : login ? (
        <Stack.Navigator initialRouteName="ViewPager">
          <Stack.Screen
            name="Enter"
            component={Enter}
            options={{ title: "업로드" }}
          />
          <Stack.Screen
            name="ViewPager"
            component={ViewPager}
            options={{ title: "메인" }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "로그인" }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: "회원가입" }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default StackNavigator;
