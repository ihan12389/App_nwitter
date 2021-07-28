import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateVisible } from "../actions/user";

const Popup = ({ visible = "false" }) => {
  const nweetObj = useSelector((state) => state.user.nweetObj);
  console.log(nweetObj);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (nweetObj !== undefined) {
      setText(nweetObj.text);
    }
  }, [nweetObj]);

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modal}>
          <TextInput
            multiline={true}
            placeholder="수정할 내용을 입력해주세요."
            value={text}
            style={styles.text}
            onChangeText={(text) => setText(text)}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => dispatch(updateVisible(false))}
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
