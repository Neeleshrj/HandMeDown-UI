import { View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../../../ui/PrimaryButton";
import axios from "axios";

import Typography from "../../../ui/Typography";

//hooks
import useEnv from "../../../hooks/useEnv";
import useAuth from "../../../hooks/useAuth";

export default function ActiveJobBox({ data, setChange }) {
  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function forfeitTask() {
    const url = baseURL + "/api/tasks/forfeit/" + data._id;
    await axios
      .put(url,{},{
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        Alert.alert("Task Forfeited Successfully","",[
          {
            text: "Ok",
            onPress: null
          }
        ])
        setChange(true)
      })
      .catch((e) => {
        console.log(e)
        Alert.alert("Something went wrong! Try again.","",[
          {
            text: "Ok",
            onPress: null
          }
        ])
      });
  }

  return (
    <View style={styles.container}>
      <Typography textSize="h3" textWeight="600" textColor="neutral">
        {data.taskTitle}
      </Typography>
      <Typography textSize="h4" textWeight="600" textColor="neutral">
        Description:
      </Typography>
      <Typography textSize="h4" textWeight="300" textColor="neutral">
        {data.description}
      </Typography>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography textSize="h4" textWeight="400" textColor="neutral">
          Payout: {data.payout}
        </Typography>
        <PrimaryButton
          styling={{ borderRadius: 12, backgroundColor: "#EA2027" }}
          action={() =>
            Alert.alert(
              "Are you sure you want to forfiet this task?",
              "You will recieve 10% less in your next payment",
              [
                {
                  text: "Yes",
                  onPress: () => forfeitTask(),
                },
                {
                  text: "Cancel",
                  onPress: null,
                },
              ]
            )
          }
        >
          <Typography textColor="white1" textSize="h4" textWeight="400">
            Forfiet
          </Typography>
        </PrimaryButton>
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
    padding: "4%",
    marginTop: "4%",
    elevation: 10,
  },
});
