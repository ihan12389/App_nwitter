import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { updateVisible } from "../actions/user";
import { dbService, storageService } from "../Firebase";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Popup = ({ visible = "false" }) => {
  const nweetObj = useSelector((state) => state.user.nweetObj);
  const user = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nweetObj !== undefined) {
      setText(nweetObj.text);
    }
  }, [nweetObj, visible]);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const closeModal = () => {
    setImage(null);
    dispatch(updateVisible(false));
  };

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

  const updatePost = async () => {
    if (text === "") {
      alert("뭐라도 입력해보세요!");
      return;
    }
    let attachmentUrl = "";
    if (image !== null) {
      if (nweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
      attachmentUrl = await uploadImageAsync(image);
    }
    let newObj = {
      text,
      attachmentUrl: attachmentUrl ? attachmentUrl : nweetObj.attachmentUrl,
    };
    await dbService.doc(`nweets/${nweetObj.id}`).update(newObj);
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
          )}
          <TextInput
            multiline={true}
            placeholder="수정할 내용을 입력해주세요."
            value={text}
            style={styles.text}
            onChangeText={(text) => setText(text)}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => updatePost()}
            >
              <Text style={styles.buttonText}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => closeModal()}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: -1,
  },
  modal: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 20,
    zIndex: 1,
  },
  text: {
    width: "75%",
    fontSize: 16,
    textAlign: "center",
    margin: 16,
    padding: 13,
    borderBottomColor: "#dedede",
    borderBottomWidth: 2,
  },
  button: {
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
