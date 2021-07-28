import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import Popup from "./Popup";
import { updateVisible, updateNweetObj } from "../actions/user";

const Nweet = ({ userObj, nweetObj, isOwner }) => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (nweetObj.attachmentUrl.length !== 0) {
      Image.getSize(nweetObj.attachmentUrl, (width, height) => {
        setWidth(width);
        setHeight(height);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upbar}>
        {nweetObj.userName && (
          <Text style={styles.name}>{nweetObj.userName}</Text>
        )}
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Feather name="trash" style={styles.icon} />
          <Feather
            name="edit"
            style={styles.icon}
            onPress={() => {
              // if (isOwner) {
              dispatch(updateNweetObj(nweetObj));
              dispatch(updateVisible(true));
              // } else {
              // alert("권한이 없습니다");
              // }
            }}
          />
        </View>
      </View>
      <Text style={styles.content}>{nweetObj.text}</Text>
      {width !== null && height !== null && (
        <Image
          source={{ uri: nweetObj.attachmentUrl }}
          style={{
            aspectRatio: width / height,
            width: "100%",
            backgroundColor: "black",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  upbar: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  name: {
    color: "#e6483d",
    marginTop: 5,
    marginLeft: 10,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 14,
  },
  icon: {
    marginRight: 15,
    marginTop: 5,
    fontSize: 15,
    color: "#43a047",
  },
  content: {
    marginTop: 20,
    marginBottom: 15,
    width: "90%",
  },
});

export default Nweet;
