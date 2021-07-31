import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { authService } from "../Firebase";

const Logout = (props) => {
  const logout = async () => {
    await authService.signOut();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fdfbfb",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={logout}
        style={{
          padding: 30,
          backgroundColor: "#fe0000",
          borderRadius: 60,
          marginBottom: 80,
        }}
      >
        <Text style={{ fontSize: 35, fontWeight: "bold", color: "white" }}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
