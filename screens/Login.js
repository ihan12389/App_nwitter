import React, { useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Button,
} from "react-native";
import { updateEmail, updatePassword, login, getUser } from "../actions/user";
import { authService } from "../Firebase";
import { useSelector, useDispatch } from "react-redux";

const Login = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((User) => {
      if (User) {
        dispatch(getUser(User.uid));
        if (user != null) {
          props.navigation.navigate("Home");
        }
      }
    });
  }, []);

  // rending
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={user.email}
        onChangeText={(email) => dispatch(updateEmail(email))}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.inputBox}
        value={user.password}
        onChangeText={(password) => dispatch(updatePassword(password))}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => dispatch(login())}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account yet? Sign up"
        onPress={() => props.navigation.navigate("Signup")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#F6820D",
    borderColor: "#F6820D",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
});

export default Login;
