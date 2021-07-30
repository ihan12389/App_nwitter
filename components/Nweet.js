import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { updateVisible, updateNweetObj } from "../actions/user";
import { dbService, storageService } from "../Firebase";

const Nweet = ({ nweetObj, isOwner }) => {
  const dispatch = useDispatch();

  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const confirm = () => {
    Alert.alert(
      "당신의 이야기를 지우려고 합니다.",
      "정말로 지우시겠습니까?",
      [
        { text: "예!", onPress: () => onDelete() },
        {
          text: "아니오...",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    if (nweetObj.attachmentUrl.length !== 0) {
      Image.getSize(nweetObj.attachmentUrl, (width, height) => {
        setWidth(width);
        setHeight(height);
      });
    }
  }, [nweetObj.attachmentUrl]);

  const onDelete = async () => {
    await dbService.doc(`nweets/${nweetObj.id}`).delete();
    if (nweetObj.attachmentUrl !== "") {
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upbar}>
        {nweetObj.userName && (
          <Text style={styles.name}>{nweetObj.userName}</Text>
        )}
        <View style={{ flexDirection: "row", marginLeft: 10 }}>
          <Feather name="trash" style={styles.icon} onPress={() => confirm()} />
          <Feather
            name="edit"
            style={styles.icon}
            onPress={() => {
              if (isOwner) {
                dispatch(updateNweetObj(nweetObj));
                dispatch(updateVisible(true));
              } else {
                alert("권한이 없습니다");
              }
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
