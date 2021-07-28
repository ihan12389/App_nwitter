import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Nweet from "../components/Nweet";
import { authService, dbService } from "../Firebase";
import { LinearGradient } from "expo-linear-gradient";
import Popup from "../components/Popup";

const Home = (props) => {
  const user = useSelector((state) => state.user);

  const [nweets, setNweets] = useState([]);

  const logout = async () => {
    await authService.signOut();
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);

  return (
    <LinearGradient colors={["#74ebd5", "#acb6e5"]}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: 40,
            paddingBottom: 20,
            justifyContent: "center",
            backgroundColor: "rgba(19,16,16, 0.04)",
          }}
        >
          <TouchableOpacity
            style={styles.barButton}
            onPress={() => props.navigation.navigate("Enter")}
          >
            <Text style={styles.barButtonText}>글 쓰기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.barButton}
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Text style={styles.barButtonText}>프로필 수정</Text>
          </TouchableOpacity>
        </View>
        <Popup visible={user.visible} />
        {/* <Text>Home Screen</Text> */}
        {/* <Text>{user.name}</Text> */}
        {/* <Button title="Logout" onPress={() => logout()} /> */}
        {nweets.map((nweet, index) => (
          <View style={styles.nweets} key={index}>
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === user.uid}
            />
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#e7473c",
    // justifyContent: "center",
    // alignItems: "center",
  },
  nweets: {
    backgroundColor: "#efefef",
    margin: 30,
    padding: 20,
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  barButton: {
    width: "35%",
    borderRadius: 15,
    marginLeft: 20,
    padding: 5,
  },
  barButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Home;
