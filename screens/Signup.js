import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  updateEmail,
  updatePassword,
  updateName,
  signup,
} from "../actions/user";

const Signup = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(email) => dispatch(updateEmail(email))}
        autoCapitalize="none"
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Password"
        value={user.password}
        onChangeText={(password) => dispatch(updatePassword(password))}
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.inputBox}
      />
      <TextInput
        placeholder="Name"
        value={user.displayName}
        onChangeText={(displayName) => dispatch(updateName(displayName))}
        style={styles.inputBox}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(signup())}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Button
        title="If you have account, here is Login!"
        onPress={() => props.navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    width: "85%",
    textAlign: "center",
    padding: 15,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "#d3d3d3",
    fontSize: 16,
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    backgroundColor: "#FFA611",
    borderColor: "#FFA611",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Signup;
