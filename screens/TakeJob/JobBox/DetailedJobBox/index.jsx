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
    const url =
      `${baseURL}/api/tasks/accept/${data._id}/${AuthContext.userId}`;
    await axios
      .put(url, {}, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        Alert.alert("Task Accepted","",[
            {
                text: "Ok",
                onPress: navigation.pop()
            }
        ])
      })
      .catch((e) => console.log(e));
  }

  async function getPostUserInfo(){
      const url = baseURL + "/api/userInfo/getStats/" + data.postUser;
      await axios.get(url,{
          headers: {
              "x-auth-token": AuthContext.token
          }
      }).then((res) => {
          setPostUserInfo(res.data);
      }).catch(e => console.log(e));
  }

  useEffect(() => {
      getPostUserInfo()
  },[]);

  if(postUserInfo === null){
      return(
          <Loading />
      )
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.descriptionContainer}>
          <Typography textSize="h2" textWeight="600" textColor="">
            {data.taskTitle}
          </Typography>
          <Typography textSize="h4" textWeight="400" textColor="">
            {postUserInfo.name}
          </Typography>
          {data.image ? (
            <Image
              source={{ uri: data.image }}
              style={{ width: "80%", height: "40%" }}
            />
          ) : null}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginTop: "4%",
            }}
          >
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name="location-outline"
                color="#000"
                size={heightPercentageToDP(4)}
              />
              <Typography textSize="h4" textWeight="400">
                Location
              </Typography>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Ionicons
                name="cash-outline"
                color="#000"
                size={heightPercentageToDP(4)}
              />
              <Typography textSize="h4" textWeight="400">
                {data.payout} Koins
              </Typography>
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
        </View>
      </ScrollView>
      <View style={{ paddingVertical: "4%", backgroundColor: "transparent" }}>
        <PrimaryButton
          styling={{ marginHorizontal: "4%", borderRadius: 24 }}
          action={() => Alert.alert("Are you sure you want to accept?","",[
              {
                  text: "Yes",
                  onPress: () => acceptJob()
              },
              {
                  text: "Cancel",
                  onPress: null
              }
          ])}
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
    flex: 1,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
