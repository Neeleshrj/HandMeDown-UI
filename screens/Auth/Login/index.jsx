import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";

import Typography from "../../../ui/Typography";
import InputContainer from "../../../ui/InputContainer";
import CustomTextInput from "../../../ui/TextInput";
import PrimaryButton from "../../../ui/PrimaryButton";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: "4%" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("proceed")}
          >
            <Ionicons
              name="chevron-back-outline"
              size={heightPercentageToDP(4)}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
          <Typography textSize="h1" textColor="black1" textWeight="600">
            Sign In
          </Typography>
        </View>
        <View style={{ marginTop: "5%", marginHorizontal: "4%" }}>
          <InputContainer styling={styles.inputAreaContainer}>
            <CustomTextInput
              placeholder="Phone Number"
              value={phoneNumber}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setPhoneNumber(val)}
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <CustomTextInput
              placeholder="Password"
              value={password}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setPassword(val)}
            />
          </InputContainer>
        </View>
      </ScrollView>
      <PrimaryButton
        borderRadius={12}
        styling={{ marginHorizontal: "4%", marginBottom: "10%" }}
        action={() => console.log("login")}
      >
        <Typography textSize="h5" textColor="white1" textWeight="600">
          Login
        </Typography>
      </PrimaryButton>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  headerContainer: {
    paddingVertical: "2%",
    paddingHorizontal: "4%",
  },
  button: {
    backgroundColor: "#F50057",
    alignItems: "center",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    marginRight: "2%",
    elevation: 10,
  },
  inputAreaContainer: {
    marginVertical: "2%",
  },
});
