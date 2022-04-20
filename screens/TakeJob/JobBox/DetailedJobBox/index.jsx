import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";

import Typography from "../../../../ui/Typography";
import PrimaryButton from "../../../../ui/PrimaryButton";

import useEnv from "../../../../hooks/useEnv";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Loading from "../../../Loading";

export default function DetailedJobBox({ route, navigation }) {
  const { data } = route.params;
  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  const [postUserInfo, setPostUserInfo] = useState(null);

  async function acceptJob() {
    const url = `${baseURL}/api/tasks/accept/${data._id}/${AuthContext.userId}`;
    await axios
      .put(
        url,
        {},
        {
          headers: {
            "x-auth-token": AuthContext.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert("Task Accepted", "", [
          {
            text: "Ok",
            onPress: navigation.pop(),
          },
        ]);
      })
      .catch((e) => console.log(e));
  }

  async function getPostUserInfo() {
    const url = baseURL + "/api/userInfo/getStats/" + data.postUser;
    await axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        setPostUserInfo(res.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getPostUserInfo();
  }, []);

  if (postUserInfo === null) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: "40%" }}>
        <View style={styles.descriptionContainer}>
          <Typography textSize="h2" textWeight="600" textColor="">
            {data.taskTitle}
          </Typography>
          <Typography textSize="h4" textWeight="400" textColor="">
            {postUserInfo.name}
          </Typography>
          {/* <Image
              source={{ uri: data.image }}
              style={{ width: '50%', height: 150 }}
            /> */}
          {data.image ? (
            <Image
              source={{ uri: data.image }}
              style={{
                width: heightPercentageToDP(50),
                height: heightPercentageToDP(50),
                borderRadius: 12,
                marginVertical: "4%",
              }}
            />
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginTop: "4%",
              paddingHorizontal: "2%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Ionicons
                name="location-outline"
                color="#000"
                size={heightPercentageToDP(4)}
              />
              <View style={{ paddingHorizontal: "2%" }}>
                <Typography textSize="h4" textWeight="400">
                  {data.location.name}
                </Typography>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Ionicons
                name="cash-outline"
                color="#000"
                size={heightPercentageToDP(4)}
              />
              <View style={{ flex: 1 }}>
                <Typography textSize="h4" textWeight="400">
                  {data.payout} Koins
                </Typography>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: "4%",
              paddingTop: "4%",
            }}
          >
            <Typography textSize="h3" textWeight="600">
              Job Description
            </Typography>
            <Typography textSize="h3" textWeight="400">
              {data.description}
            </Typography>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: "4%",
              paddingTop: "4%",
            }}
          >
            <Typography textSize="h3" textWeight="600">
              Address
            </Typography>
            <Typography textSize="h3" textWeight="400">
              {data.location.name},{data.location.street},{data.location.county}
              ,{data.location.region_code}
            </Typography>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          paddingBottom: "5%",
        }}
      >
        <PrimaryButton
          styling={{ marginHorizontal: "4%", borderRadius: 24 }}
          action={() =>
            Alert.alert("Are you sure you want to accept?", "", [
              {
                text: "Yes",
                onPress: () => acceptJob(),
              },
              {
                text: "Cancel",
                onPress: null,
              },
            ])
          }
        >
          <Typography textSize="h3" textWeight="600" textColor="white1">
            Accept
          </Typography>
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "4%",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
