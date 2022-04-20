import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";

//components
import Typography from "../../../ui/Typography";
import PrimaryButton from "../../../ui/PrimaryButton";

//hooks
import useEnv from "../../../hooks/useEnv";
import useAuth from "../../../hooks/useAuth";

export default function JobBox({ data, setChange, status }) {
  const { baseURL } = useEnv();
  const AuthContext = useAuth();
  const [acceptUser, setAcceptUserName] = useState("");

  async function markComplete() {
    const url =
      baseURL + "/api/tasks/completed/" + data._id + "/" + AuthContext.userId;
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
        Alert.alert("Task marked completed successfully.", "", [
          {
            text: "Ok",
            onPress: () => setChange(true),
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Something went wrong! Try again.", "", [
          {
            text: "Ok",
            onPress: null,
          },
        ]);
      });
  }

  async function deleteTask() {
    const url = baseURL + "/api/tasks/delete/" + data._id;
    await axios
      .delete(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        Alert.alert("Task deleted successfully.", "", [
          {
            text: "Ok",
            onPress: null,
          },
        ]);
        setChange(true);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Something went wrong! Try again.", "", [
          {
            text: "Ok",
            onPress: null,
          },
        ]);
      });
  }

  async function getAcceptUser() {
    const url = baseURL + "/api/userInfo/name/" + data.acceptUser;
    await axios
      .get(url, {
        headers: { "x-auth-token": AuthContext.token },
      })
      .then((res) => {
        setAcceptUserName(res.data.name);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (data.acceptUser) {
      getAcceptUser();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Typography textSize="h3" textWeight="600" textColor="neutral">
        {data.taskTitle}
      </Typography>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="location-outline"
          color="#000"
          size={heightPercentageToDP(2.5)}
          style={{ marginRight: "1%" }}
        />
        <Typography textSize="h4" textWeight="400" textColor="neutral">
          {data.location.county}
        </Typography>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons
          name="person-outline"
          color="#000"
          size={heightPercentageToDP(2.5)}
          style={{ marginRight: "1%" }}
        />
        <Typography textSize="h4" textWeight="400" textColor="neutral">
          {data.acceptUser ? acceptUser : "Not Accepted Yet"}
        </Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Typography textSize="h3" textWeight="600" textColor="neutral">
          {data.payout}{" "}
        </Typography>
        <Typography textSize="h3" textWeight="400" textColor="neutral">
          Koins
        </Typography>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          flexDirection: "row",
          justifyContent: data.acceptUser ? "flex-end" : "space-between",
          marginVertical: "2%",
        }}
      >
        {status === "completed" ? (
            <Typography textSize="h5">
                Completed
            </Typography>
        ) : (
            !data.acceptUser ? (
                <PrimaryButton
                  styling={{
                    width: "40%",
                    borderRadius: 8,
                    backgroundColor: "#EA2027",
                    flexDirection: "row",
                  }}
                  action={() =>
                    Alert.alert("Are you sure you want to Delete this task?", "", [
                      {
                        text: "Yes",
                        onPress: () => deleteTask(),
                      },
                      {
                        text: "Cancel",
                        onPress: null,
                      },
                    ])
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    color="#fff"
                    size={heightPercentageToDP(3)}
                    style={{ marginRight: "2%" }}
                  />
                  <Typography textSize="h4" textColor="white1" textWeight="400">
                    Delete
                  </Typography>
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  styling={{
                    width: "50%",
                    borderRadius: 8,
                    backgroundColor: "#1dd1a1",
                    flexDirection: "row",
                  }}
                  action={() =>
                    Alert.alert(
                      "Mark this task as completed?",
                      "This will initiate the crypto trasnfer",
                      [
                        {
                          text: "Yes",
                          onPress: () => markComplete(),
                        },
                        {
                          text: "Cancel",
                          onPress: null,
                        },
                      ]
                    )
                  }
                >
                  <Typography textSize="h4" textColor="white1" textWeight="400">
                    Mark as Done
                  </Typography>
                  <Ionicons
                    name="checkmark-outline"
                    color="#fff"
                    size={heightPercentageToDP(3)}
                    style={{ marginLeft: "1%" }}
                  />
                </PrimaryButton>
              )
        )}
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: "#F50057",
    borderWidth: 1,
    borderRadius: 12,
    padding: "2%",
    paddingHorizontal: "4%",
    marginTop: "4%",
    elevation: 10,
    marginHorizontal: "4%",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: "0%",
    alignItems: "center",
  },
});
