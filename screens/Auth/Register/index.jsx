import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";

import Typography from "../../../ui/Typography";
import InputContainer from "../../../ui/InputContainer";
import CustomTextInput from "../../../ui/TextInput";
import PrimaryButton from "../../../ui/PrimaryButton";

export default function Register({navigation}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  //   const [publicKey, setPublicKey] = useState("");

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: "4%" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.pop()}
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
            Sign Up
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
              placeholder="Full Name"
              value={fullName}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setFullName(val)}
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <CustomTextInput
              placeholder="Email"
              value={email}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setEmail(val)}
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
          <InputContainer
            styling={[styles.inputAreaContainer, { marginBottom: "10%" }]}
          >
            <CustomTextInput
              placeholder="Confirm Password"
              value={cPassword}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setCPassword(val)}
            />
          </InputContainer>
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Typography textSize="h6" textWeight="400" textColor="black1">
            Old User? Sign In{" "}
          </Typography>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Typography textSize="h6" textWeight="400" textColor="primary">
              here
            </Typography>
          </TouchableOpacity>
        </View>

        <PrimaryButton
          borderRadius={12}
          styling={{
            marginHorizontal: "4%",
            marginBottom: "10%",
            width: "90%",
            marginTop: "5%",
          }}
          action={() => console.log("login")}
        >
          <Typography textSize="h4" textColor="white1" textWeight="600">
            Sign In
          </Typography>
        </PrimaryButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: '#fff'
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
