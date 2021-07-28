import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateName } from "../actions/user";
import { authService, dbService } from "../Firebase";

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.displayName);

  const update = async () => {
    await authService.currentUser.updateProfile({ displayName: name });
    await dbService.doc(`users/${user.uid}`).update({ displayName: name });
    dispatch(updateName(name));
  };

  console.log(user.displayName);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <TextInput value={name} onChangeText={(text) => setName(text)} />
      <Text>{user.displayName}</Text>
      <Button title="Submit" onPress={() => update()} />
      <Button title="Back" onPress={() => props.navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
