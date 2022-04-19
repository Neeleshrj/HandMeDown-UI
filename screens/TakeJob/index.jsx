import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

//components
import Typography from "../../ui/Typography";
import InputContainer from "../../ui/InputContainer";
import CustomTextInput from "../../ui/TextInput";
import Loading from "../Loading";

//providers
import useEnv from "../../hooks/useEnv";
import useAuth from "../../hooks/useAuth";
import JobBox from "./JobBox";

export default function TakeJob({ navigation }) {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const isFocused = useIsFocused();

  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function getData() {
    const url = baseURL + "/api/tasks/all/" + AuthContext.userId;
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

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  });

  useEffect(() => {
    getData();
  }, [isFocused]);

  if (data === null) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography textSize="h1" textWeight="400" textColor="primary">
          Find Odd Jobs For You Here
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
      <View style={styles.taskContainer}>
        {data.map((x, i) => (
          <JobBox data={x} key={i} navigation={navigation} />
        ))}
      </View>
      <TouchableOpacity style={styles.addTaskButton}>
        <Ionicons
          name="add-outline"
          size={heightPercentageToDP(4)}
          color="#F50057"
        />
        <Typography textSize="h3" textWeight="400" textColor="primary">
          Add Job
        </Typography>
      </TouchableOpacity>
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
  },
  searchBar: {
    paddingHorizontal: "4%",
    paddingVertical: "2%",
  },
  taskContainer: {
    // backgroundColor: "red",
    flex: 1,
    marginTop: "4%",
  },
  addTaskButton: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 10,
    right: 10,
    width: heightPercentageToDP(20),
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 100,
    borderColor: "#F50057",
    borderWidth: 1,
    elevation: 10,
  },
});
