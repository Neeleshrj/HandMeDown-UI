import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

//components
import Typography from "../../ui/Typography";
import InputContainer from "../../ui/InputContainer";
import CustomTextInput from "../../ui/TextInput";
import JobBox from "./JobBox";

//hooks
import useEnv from "../../hooks/useEnv";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loading";

export default function PostedJobs() {
  const [searchTerm, setSearchTerm] = useState();
  const [change, setChange] = useState(false);
  const [data, setData] = useState(null);
  const [completed, setCompleted] = useState(null);
  const isFocused = useIsFocused();

  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function getData() {
    const url = baseURL + "/api/tasks/all/posted/" + AuthContext.userId;
    await axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  }

  async function getCompletedData() {
    const url = baseURL + "/api/tasks/all/completed/" + AuthContext.userId;
    await axios
      .get(url, {
        headers: {
          "x-auth-token": AuthContext.token,
        },
      })
      .then((res) => {
        setCompleted(res.data)
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getData();
    getCompletedData();
  }, [isFocused]);

  useEffect(() => {
    getData();
    getCompletedData();
    setChange(false);
  }, [change]);

  if (data === null || completed === null) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography textSize="h1" textWeight="400" textColor="primary">
          Jobs History
        </Typography>
      </View>
      <View style={styles.serachBarContainer}>
        <InputContainer styling={styles.searchBar}>
          <Ionicons
            name="search-outline"
            color="#000"
            size={heightPercentageToDP(3)}
          />
          <CustomTextInput
            placeholder="Search"
            value={searchTerm}
            onChange={(val) => setSearchTerm(val)}
            styling={{ marginLeft: "2%" }}
          />
        </InputContainer>
      </View>
      <ScrollView contentContainerStyle={styles.taskContainer}>
        {data.map((x, i) => (
          <JobBox data={x} key={i} setChange={setChange} />
        ))}
        <View style={styles.headerContainer}>
        <Typography textSize="h1" textWeight="400" textColor="primary">
          Completed Jobs
        </Typography>
        {completed.map((x, i) => (
          <JobBox data={x} key={i} setChange={setChange} status="completed"/>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: "4%",
    marginTop: "4%",
  },
  serachBarContainer: {
    marginHorizontal: "4%",
    paddingBottom: '2%'
  },
  searchBar: {
    paddingHorizontal: "4%",
    paddingVertical: "2%",
  },
  taskContainer: {
    // backgroundColor: "red",
    marginTop: "4%",
    paddingBottom: "20%",
  },
});
