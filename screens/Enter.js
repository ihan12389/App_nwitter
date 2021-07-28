import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFonts } from "expo-font";

const Enter = (props) => {
  const [text, setText] = useState("");

  const user = useSelector((state) => state.user);
  console.log(user);

  const [sans] = useFonts({ Sans: require(`../assets/NotoSansKR-Black.otf`) });
  const [sans2] = useFonts({ Sans2: require(`../assets/NotoSansKR-Bold.otf`) });
  const [sans3] = useFonts({
    Sans3: require(`../assets/NotoSansKR-Light.otf`),
  });
  const [sans4] = useFonts({
    Sans4: require(`../assets/NotoSansKR-Medium.otf`),
  });

  if (!sans) {
    return null;
  }
  if (!sans2) {
    return null;
  }
  if (!sans3) {
    return null;
  }
  if (!sans4) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.topText}>Enter 컴포넌트</Text> */}
      <Text style={styles.middleText}>{user.displayName}님 안녕하세요?</Text>
      <Text style={styles.bottomText}>오늘의 생각을 적어주세요.</Text>
      <TextInput
        placeholder="What do you think?"
        value={text}
        style={styles.inputText}
        onChangeText={(text) => setText(text)}
        multiline={true}
        maxLength={500}
      />
      <Text>{text.length}/500</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.enter}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  topText: {
    fontFamily: "Sans",
    fontSize: 50,
    color: "gray",
  },
  middleText: {
    fontFamily: "Sans2",
    fontWeight: "bold",
    // fontFamily: "normal",
    fontSize: 25,
    marginTop: -80,
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
    fontFamily: "Sans2",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Enter;
