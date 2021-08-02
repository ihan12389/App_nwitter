import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateName, updateUserProfile } from "../actions/user";
import { authService, dbService } from "../Firebase";
import * as ImagePicker from "expo-image-picker";

const Profile = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(props.user.displayName);
  const [image, setImage] = useState(null);

  const update = async () => {
    await authService.currentUser.updateProfile({ displayName: name });
    await dbService
      .doc(`users/${props.user.uid}`)
      .update({ displayName: name });
    dispatch(updateName(name));
  };

  const updateProfile = async () => {
    await authService.currentUser.updateProfile({ profileImageUrl: image });
    await dbService
      .doc(`users/${props.user.uid}`)
      .update({ profileImageUrl: image });
    dispatch(updateUserProfile(image));
    setImage(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fdfbfb",
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            flex: 9,
          }}
          keyboardVerticalOffset={0}
        >
          <View style={styles.imageBar}>
            {props.user.profileImageUrl.length !== 0 && (
              <Image
                source={{ uri: props.user.profileImageUrl }}
                style={[styles.image]}
              />
            )}
            {image !== null && (
              <Image source={{ uri: image }} style={[styles.newImage]} />
            )}
          </View>
          <View style={styles.textBar}>
            <TextInput
              style={styles.nameInput}
              value={name}
              onChangeText={(text) => setName(text)}
              maxLength={15}
              style={styles.inputName}
            />
            <Text style={styles.name}>{props.user.displayName}</Text>
          </View>
        </KeyboardAvoidingView>
        {image === null ? (
          <View style={styles.buttonBar}>
            <TouchableOpacity
              onPress={() => pickImage()}
              style={styles.buttonContainer1}
            >
              <Text style={styles.buttonText}>프로필 사진</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => update()}
              style={styles.buttonContainer2}
            >
              <Text style={styles.buttonText}>프로필 네임</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonBar}>
            <TouchableOpacity
              style={styles.buttonContainer1}
              onPress={() => updateProfile()}
            >
              <Text style={styles.buttonText}>UPDATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer2}
              onPress={() => {
                setImage(null);
              }}
            >
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonBar: {
    flexDirection: "row",
    width: "100%",
    height: Dimensions.get("window").height / 15,
    opacity: 0.7,
  },
  buttonContainer1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#ebae34",
  },
  buttonContainer2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eb5334",
    paddingHorizontal: 30,
  },
  buttonContainer3: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#eb3471",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  textBar: {
    width: "80%",
    alignItems: "center",
    marginBottom: Dimensions.get("window").height / 8,
  },
  inputName: {
    width: "100%",
    borderColor: "#ddd",
    borderBottomWidth: 2,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    color: "#3471eb",
    fontWeight: "bold",
  },
  imageBar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 14,
  },
  image: {
    width: (Dimensions.get("window").width * 3) / 5,
    height: (Dimensions.get("window").width * 3) / 5,
  },
  newImage: {
    width: (Dimensions.get("window").width * 2) / 6,
    height: (Dimensions.get("window").width * 2) / 6,
    marginLeft: 10,
  },
});

export default Profile;
