import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Nweet from "../components/Nweet";
import { authService, dbService } from "../Firebase";
import { LinearGradient } from "expo-linear-gradient";
import Popup from "../components/Popup";
import { Feather } from "@expo/vector-icons";

const Home = (props) => {
  const [nweets, setNweets] = useState([]);
  const [n, setN] = useState(10);
  const [last, setLast] = useState(0);
  const [first, setFirst] = useState(true);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.nweets}>
        <Nweet
          key={item.id}
          nweetObj={item}
          isOwner={item.creatorId === props.user.uid}
        />
      </View>
    );
  };

  const _headerComponent = () => {
    return (
      <View
        style={{
          paddingTop: 40,
          paddingBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "#190309",
            textTransform: "uppercase",
            marginBottom: Dimensions.get("window").height / 30,
            marginTop: Dimensions.get("window").height / 12,
          }}
        >
          Welcome my App
        </Text>
        <TouchableOpacity
          style={styles.barButton}
          onPress={() => props.navigation.push("Enter")}
        >
          <Feather name="plus-circle" size={60} color="#ff5722" />
        </TouchableOpacity>
      </View>
    );
  };

  const _getData = async () => {
    if (first) {
      await dbService
        .collection("nweets")
        .orderBy("createAt", "desc")
        .limit(n)
        .onSnapshot((snapshot) => {
          const nweetArray = snapshot.docs.map((doc, index) => {
            if (index === snapshot.docs.length - 1)
              setLast(doc.data().createAt);
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setNweets(nweets.concat(nweetArray));
        });
      setFirst(false);
    } else if (!first) {
      await dbService
        .collection("nweets")
        .orderBy("createAt", "desc")
        .limit(n)
        .startAfter(last)
        .onSnapshot((snapshot) => {
          const nweetArray = snapshot.docs.map((doc, index) => {
            if (index === snapshot.docs.length - 1)
              setLast(doc.data().createAt);
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setNweets(nweets.concat(nweetArray));
        });
    }
  };

  useEffect(() => {
    _getData();
  }, []);

  return (
    <LinearGradient colors={["#fdfbfb", "#ebedee"]}>
      <Popup visible={props.user.visible} />
      <FlatList
        data={nweets}
        renderItem={_renderItem}
        ListHeaderComponent={_headerComponent}
        keyExtractor={(item, index) => item.id}
        onEndReached={_getData}
        onEndReachedThreshold={1}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
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
    padding: 5,
    alignItems: "center",
  },
  barButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Home;
