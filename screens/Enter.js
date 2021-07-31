import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { dbService, storageService } from "../Firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Enter = (props) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const user = useSelector((state) => state.user);

  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const ref = storageService.ref().child(`${user.uid}/${uuidv4()}`);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  const onSubmit = async () => {
    if (text === "") {
      alert("글을 입력해주세요!");
      return;
    }
    let attachmentUrl = "";
    if (image !== null) {
      attachmentUrl = await uploadImageAsync(image);
    }
    const newObj = {
      text: text.trim(),
      createAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
      userName: user.displayName,
    };
    await dbService.collection("nweets").add(newObj);
    props.navigation.pop();
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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Pick your Photos!</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Text style={styles.middleText}>
            {user.displayName}님 안녕하세요?
          </Text>
          <Text style={styles.bottomText}>오늘의 생각을 적어주세요.</Text>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 0}
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{
              width: "100%",
              marginTop: Dimensions.get("window").height / 20,
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <TextInput
                placeholder="What do you think?"
                value={text}
                style={image ? styles.isImage : styles.inputText}
                onChangeText={(text) => setText(text)}
                multiline={true}
                maxLength={500}
              />
              <Text>{text.length}/500</Text>
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity style={styles.enter} onPress={() => onSubmit()}>
              <Text style={styles.enterText}>Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => props.navigation.pop()}
            >
              <Text style={styles.enterText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleText: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: Dimensions.get("window").height / 28,
  },
  bottomText: {
    marginTop: 10,
    fontSize: 17,
  },
  inputText: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "black",
  },
  enter: {
    marginTop: 60,
    backgroundColor: "#272822",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  cancel: {
    marginTop: 60,
    backgroundColor: "#a80300",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  enterText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    opacity: 0.5,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#ffcb2a",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 60,
    marginTop: Dimensions.get("window").height / 10,
  },
  imageButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  form: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  isImage: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
    color: "black",
    position: "relative",
    marginTop: 25,
  },
});

export default Enter;
