import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";

import Loading from "../Loading";

//components
import Typography from "../../ui/Typography";
import Card from "../../ui/Card";

//hooks
import useEnv from "../../hooks/useEnv";
import useAuth from "../../hooks/useAuth";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function getData() {
    setLoading(true);
    console.log(AuthContext.userId);
    console.log(AuthContext.token)
    const url = baseURL + "/api/userInfo/getStats/" + AuthContext.userId;
    await axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        console.log(res.data)
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
        <Card styling={styles.statCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography textSize="h3" textWeight="600">
              Jobs Taken:{""}
            </Typography>
            <Typography textSize="h3" textWeight="600">
              {data.tasksAccepted}
            </Typography>
          </View>
        </Card>
        <Card styling={styles.statCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Typography textSize="h3" textWeight="600">
              Jobs Posted
            </Typography>
            <Typography textSize="h3" textWeight="600">
              {data.tasksPosted}
            </Typography>
          </View>
        </Card>
      </View>
      <View style={styles.lowerContainer}>
        <Card>
          <Typography textSize="h3" textWeight="600">
            Total Income
          </Typography>
        </Card>
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
    // flexDirection: 'row',
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statCard: {
    padding: "4%",
    borderColor: "#F50057",
    borderWidth: 1,
    marginVertical: "4%",
    width: "70%",
    height: 100,
    flex: 1,
    justifyContent: "center",
  },
  lowerContainer: {
    backgroundColor: "green",
    flex: 1,
  },
});
