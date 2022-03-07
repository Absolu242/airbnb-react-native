import React from "react";
import { Button, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../redux/usersSlice";

export default function Gate() {
  const { isLoggedIn } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();


  console.log(isLoggedIn);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      {isLoggedIn ? (
        <Text>
          Welcome
          <TouchableOpacity onPress={() => dispatch(logOut())}>
           <Text> Logout</Text>
          </TouchableOpacity>
        </Text>
      ) : (
        <Text>
          Login Please
          <TouchableOpacity onPress={() => dispatch(logIn("ghgf"))}>
            <Text>Login</Text>
          </TouchableOpacity>
        </Text>
      )}
    </View>
  );
}
