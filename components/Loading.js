import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Loading = () => {
  console.log("로딩 화면");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>로딩 화면입니다...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30,
  },
});

export default Loading;
