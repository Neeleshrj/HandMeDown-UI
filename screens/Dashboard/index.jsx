import { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

import Loading from "../Loading";

//components
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

//hooks
import useEnv from "../../hooks/useEnv";
import useAuth from "../../hooks/useAuth";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function getData() {
    setLoading(true);
    const url = baseURL + "/api/userInfo/getStats/" + AuthContext.userId;
    await axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        setData(res.data);
        // setTimeout(() => {

        // }, 4000);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if (data === null) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "5%",
          }}
        >
          <Typography textSize="h1" textWeight="600" textColor="primary">
            {data.totalIncome} Koins
          </Typography>
          <Typography textSize="h3" textWeight="600">
            Total Income
          </Typography>
        </View>
        <Typography textSize="h4" textWeight="600">
          Statistics
        </Typography>
        <ScrollView
          horizontal
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
        >
          {/* <View> */}
          {/* Tasks Accepted */}
          <View style={{ width: 160 }}>
            <Card styling={styles.statCard}>
              <View>
                <Ionicons
                  name="list-outline"
                  color="#000"
                  size={heightPercentageToDP(4)}
                />
                <Typography textSize="h2" textWeight="600">
                  {data.tasksAccepted}
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Jobs
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Accepted
                </Typography>
              </View>
            </Card>
          </View>

          {/* Tasks Posted */}
          <View style={{ width: 160, height: 150 }}>
            <Card styling={styles.statCard}>
              <View>
                <Ionicons
                  name="add-circle-outline"
                  color="#000"
                  size={heightPercentageToDP(4)}
                />
                <Typography textSize="h2" textWeight="600">
                  {data.tasksPosted}
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Jobs
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Posted
                </Typography>
              </View>
            </Card>
          </View>

          {/* Tasks Completed */}
          <View style={{ width: 160, height: 150 }}>
            <Card styling={styles.statCard}>
              <View>
                <Ionicons
                  name="checkmark-circle-outline"
                  color="#000"
                  size={heightPercentageToDP(4)}
                />
                <Typography textSize="h2" textWeight="600">
                  {data.tasksPosted}
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Jobs
                </Typography>
                <Typography textSize="h6" textWeight="600">
                  Completed
                </Typography>
              </View>
            </Card>
          </View>

          {/* </View> */}
        </ScrollView>
      </View>
      <View style={styles.lowerContainer}>
        <Typography textSize="h6" textWeight="600">
          On Going Jobs
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "2%",
  },
  upperContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statCard: {
    padding: "10%",
    borderColor: "#F50057",
    borderWidth: 1,
    marginVertical: "4%",
    height: 150,
    width: 150,
    justifyContent: "center",
  },
  lowerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
