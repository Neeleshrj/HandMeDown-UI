import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";

//components
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";
import PrimaryButton from "../../ui/PrimaryButton";
import SecondaryButton from "../../ui/SecondaryButton";
import Loading from "../Loading";

//providers
import useAuth from "../../hooks/useAuth";
import useEnv from "../../hooks/useEnv";

export default function Profile() {
  const [data, setData] = useState(null);
  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function logout(){
      AuthContext.logout();
  }

  async function getData() {
    const url = baseURL + "/api/userInfo/getStats/" + AuthContext.userId;
    axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 0.3, justifyContent: "center", paddingHorizontal: "5%" }}
      >
        <Typography textSize="h1" textColor="white1" textWeight="600">
          Profile
        </Typography>
      </View>
      <Card styling={styles.profileCard}>
        <View style={styles.pfpBox}>
          <Ionicons
            name="person"
            color="#F50057"
            size={heightPercentageToDP(8)}
          />
        </View>

        <Typography textSize="h2" textWeight="400">
          {data.name}
        </Typography>
        <Typography textSize="h4" textWeight="400">
          {data.email}
        </Typography>
        <Typography textSize="h4" textWeight="400">
          +91 {data.phoneNumber}
        </Typography>

        <View style={{ marginTop: "10%", width: "100%" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography textSize="h3" textWeight="600">
              Jobs Accepted:
            </Typography>
            <Typography textSize="h3" textWeight="400">
              {data.tasksAccepted}
            </Typography>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography textSize="h3" textWeight="600">
              Jobs Posted:
            </Typography>
            <Typography textSize="h3" textWeight="400">
              {data.tasksPosted}
            </Typography>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography textSize="h3" textWeight="600">
              Total Income:
            </Typography>
            <Typography textSize="h3" textWeight="400">
              {data.totalIncome}
            </Typography>
          </View>
        </View>

        <View style={{flexDirection: 'row',width: '100%', justifyContent: 'space-around', marginTop: '4%'}}>
          <PrimaryButton styling={{width: '40%', borderRadius: 24}}>
            <Typography textSize="h3" textWeight="600" textColor="white1">
              Link Wallet
            </Typography>
          </PrimaryButton>
          <SecondaryButton styling={{width: '40%', borderRadius: 100}} action={() => logout()}>
            <Typography textSize="h3" textWeight="600">
              Logout
            </Typography>
          </SecondaryButton>
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F50057",
    flex: 1,
  },
  profileCard: {
    padding: "4%",
    // marginHorizontal: "4%",
    // marginTop: "45%",
    elevation: 20,
    alignItems: "center",
    flex: 0.7,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  pfpBox: {
    borderColor: "#F50057",
    borderWidth: 2,
    borderRadius: 100,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%",
    marginTop: "5%",
  },
});
