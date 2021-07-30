import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { dbService, storageService } from "../Firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { out } from "react-native/Libraries/Animated/src/Easing";

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
      text,
      createAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
      userName: user.displayName,
    };
    await dbService.collection("nweets").add(newObj);
    props.navigation.navigate("Home");
  };

  const pickImage = async () => {
    // 갤러리에 접속해서 이미지를 얻기 위한 UI를 실행.
    let result = await ImagePicker.launchImageLibraryAsync({
      // 어떤 타입의 미디어를 선택할지. default는 ImagePicker.MediaTypeOptions.Images다.
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // 압축 퀄리티를 지정. 1은 최대 퀄리티로 압축한다는 뜻.
      quality: 1,
      // base64 format로 image 데이터를 보낼지 결정
      // base64: true,
      // 선택 후에 편집 UI를 보여줄지 결정. iOS 유저는 단순히 자르기만 가능.
      // allowsEditing: true,
      // 비율을 미리 지정 aspect : [?,?]
      // 한 번에 여러 파일을 선택할 수 있도록. allowsMultipleSelection : true
    });

    // 취소된 게 아니라면
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      // web 플랫폼이 아니어야 (android, iOS)
      if (Platform.OS !== "web") {
        const { status } =
          // requstMediaLibraryPermissionsAsync는 갤러리 접근 허가
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, heigth: 100 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS == "ios" ? 10 : 0}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
              <Text style={styles.imageButtonText}>Pick your Photos!</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text style={styles.middleText}>
              {user.displayName}님 안녕하세요?
            </Text>
            <Text style={styles.bottomText}>오늘의 생각을 적어주세요.</Text>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
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
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.enter} onPress={() => onSubmit()}>
                <Text style={styles.enterText}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => props.navigation.navigate("Home")}
              >
                <Text style={styles.enterText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  middleText: {
    fontWeight: "bold",
    fontSize: 25,
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
    position: "relative",
    marginTop: 90,
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
