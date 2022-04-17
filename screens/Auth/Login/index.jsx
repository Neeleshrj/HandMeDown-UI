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

//components
import Typography from "../../../ui/Typography";
import InputContainer from "../../../ui/InputContainer";
import CustomTextInput from "../../../ui/TextInput";
import PrimaryButton from "../../../ui/PrimaryButton";

//providers
import useAuth from "../../../hooks/useAuth";
import useEnv from "../../../hooks/useEnv";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const AuthContext = useAuth();
  const { baseURL } = useEnv();

  const login = async () => {
    setLoading(true);
    const url = baseURL + "/api/auth/login";
    await axios
      .post(url, {
        phoneNumber: phoneNumber,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status === 200) {
          AuthContext.setToken(res.data.authToken);
          AuthContext.setUserId(res.data.user_id);
          // AuthContext.storeTokenInAsyncStorage(res.data.authToken);
          // AuthContext.storeUserIdInAsyncStorage(res.data.user_id);
          AuthContext.storeInfo(res.data.authToken, res.data.user_id);
        } else {
          Alert.alert("Login failed!", "Invalid phone number or password", [
            {
              text: "Ok",
              onPress: null,
            },
          ]);
        }
      })
      .catch((e) => {
        Alert.alert("Login failed!", "Fields cannot be empty", [
          {
            text: "Ok",
            onPress: null,
          },
        ]);
        console.log(e);
      });
  };
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
            Sign In
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
              keyboardType="number-pad"
            />
          </InputContainer>
          <InputContainer styling={styles.inputAreaContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="#F50057"
              style={{}}
            />
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
        </View>
      </ScrollView>
      <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <Typography textSize="h6" textWeight="400" textColor="black1">
            New User? Sign Up{" "}
          </Typography>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
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
          action={() => login()}
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
    backgroundColor: "#fff",
    paddingTop: "20%",
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
