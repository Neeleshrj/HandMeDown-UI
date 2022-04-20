import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import Typography from "../../../ui/Typography";
import InputContainer from "../../../ui/InputContainer";
import CustomTextInput from "../../../ui/TextInput";
import PrimaryButton from "../../../ui/PrimaryButton";

//hooks
import useEnv from "../../../hooks/useEnv";

export default function Register({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  //   const [publicKey, setPublicKey] = useState("");

  const { baseURL } = useEnv();

  function preChecks() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!phoneNumber || phoneNumber.length != 10) {
      Alert.alert("Invalid phone number!", "", [
        {
          text: "Retry",
        },
      ]);
    }
    else if (!email || !email.match(emailRegex)) {
      Alert.alert("Invalid email!", "", [
        {
          text: "Retry",
        },
      ]);
    }
    else if (!password) {
      Alert.alert("Password cannot be empty!", "", [
        {
          text: "Retry",
        },
      ]);
    }
    else{
      register()
    }
  }

  async function register() {
    const url = baseURL + "/api/auth/register";
    await axios
      .post(url, {
        phoneNumber: phoneNumber,
        fullname: fullName,
        email: email,
        password: password,
        cPassword: cPassword,
        tasksCompleted: 0,
        totalIncome: 0
      },{})
      .then((res) => {
        Alert.alert("Registered!", "", [
          {
            text: "Ok",
            onPress: () => navigation.pop(),
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Something went wrong!", "", [
          {
            text: "Ok",
            onPress: null,
          },
        ]);
      });
  }

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
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
            <Ionicons name="call-outline" size={24} color="#F50057" />
            <CustomTextInput
              placeholder="Phone Number"
              value={phoneNumber}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setPhoneNumber(val)}
              keyboardType="phone-pad"
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <Ionicons name="person-outline" size={24} color="#F50057" />
            <CustomTextInput
              placeholder="Full Name"
              value={fullName}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setFullName(val)}
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <Ionicons name="mail-outline" size={24} color="#F50057" />
            <CustomTextInput
              placeholder="Email"
              value={email}
              styling={{ padding: "5%", width: "85%" }}
              onChangeText={(val) => setEmail(val)}
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#F50057" />
            <CustomTextInput
              placeholder="Password"
              value={password}
              styling={{ padding: "5%", width: "80%" }}
              onChangeText={(val) => setPassword(val)}
              secureTextEntry={showPassword}
            />
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#F50057"
              style={{ paddingRight: "0%" }}
              onPress={() => setShowPassword(!showPassword)}
            />
          </InputContainer>
          <InputContainer
            styling={[styles.inputAreaContainer, { marginBottom: "10%" }]}
          >
            <Ionicons name="lock-closed-outline" size={24} color="#F50057" />
            <CustomTextInput
              placeholder="Confirm Password"
              value={cPassword}
              styling={{ padding: "5%", width: "80%" }}
              onChangeText={(val) => setCPassword(val)}
              secureTextEntry={showPassword}
            />
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#F50057"
              style={{ paddingRight: "0%" }}
              onPress={() => setShowPassword(!showPassword)}
            />
          </InputContainer>
        </View>
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
          action={() => preChecks()}
        >
          <Typography textSize="h4" textColor="white1" textWeight="600">
            Sign Up
          </Typography>
        </PrimaryButton>
      </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '5%',
    backgroundColor: "#fff",
    paddingBottom: '50%'
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
    paddingLeft: "5%",
  },
});
