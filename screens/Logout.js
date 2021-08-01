import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { authService } from "../Firebase";

const Logout = () => {
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
          paddingHorizontal: 30,
          paddingVertical: 20,
          backgroundColor: "#fe0000",
          borderRadius: 40,
          marginBottom: 50,
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "bold", color: "white" }}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Logout;
