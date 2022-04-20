import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

//components
import Typography from "../../ui/Typography";
import InputContainer from "../../ui/InputContainer";
import CustomTextInput from "../../ui/TextInput";
import PrimaryButton from "../../ui/PrimaryButton";

//hooks
import useEnv from "../../hooks/useEnv";
import useAuth from "../../hooks/useAuth";

const API_KEY = "6f4b995ed2cc30b9415cde03b94f5f97";

export default function ListJob({ navigation }) {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [payout, setPayout] = useState("");
  const [image, setImage] = useState(null);
  const [imageString, setImageString] = useState("");
  const [location, setLocation] = useState(null);
  const [locationInWords, setLocationInWords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { baseURL } = useEnv();
  const AuthContext = useAuth();

  async function postJob() {
    if (jobTitle === "" || description === "" || payout === "") {
      Alert.alert("Fields cannot be empty", "", [
        {
          text: "Ok",
          onPress: null,
        },
      ]);
    }
    const url = baseURL + "/api/tasks/" + AuthContext.userId;
    await axios
      .post(
        url,
        {
          taskTitle: jobTitle,
          description: description,
          payout: payout,
          location: location,
          image: imageString,
        },
        {
          headers: {
            "x-auth-token": AuthContext.token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert("Task Added!", "", [
          {
            text: "Ok",
            onPress: () => navigation.pop(),
          },
        ]);
      })
      .catch((e) => console.log(e));
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const res = await ImageManipulator.manipulateAsync(result.uri, [], {
        base64: true,
      });
      setImageString("data:image/jpg;base64,"+res.base64);
      setImage(result.uri);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let url = `http://api.positionstack.com/v1/reverse?access_key=${API_KEY}&query=${location.coords.latitude},${location.coords.longitude}`;

      await axios
        .get(url)
        .then((res) => {
          setLocationInWords(res.data.data[0].label);
          setLocation(res.data.data[0]);
        })
        .catch((e) => console.log(e));
    })();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Typography textSize="h1" textColor="black1" textWeight="600">
          Post A Job
        </Typography>
      </View>
      <View style={{ marginTop: "5%", marginHorizontal: "4%" }}>
        <InputContainer styling={styles.inputAreaContainer}>
          <Ionicons name="briefcase-outline" size={24} color="#F50057" />
          <CustomTextInput
            placeholder="Job Title"
            value={jobTitle}
            styling={{ padding: "5%", width: "85%" }}
            onChangeText={(val) => setJobTitle(val)}
          />
        </InputContainer>
        <InputContainer styling={styles.inputAreaContainer}>
          <Ionicons name="reader-outline" size={24} color="#F50057" />
          <CustomTextInput
            placeholder="Description"
            value={description}
            multiline={true}
            styling={{ padding: "5%", width: "85%", height: 100 }}
            onChangeText={(val) => setDescription(val)}
          />
        </InputContainer>
        <InputContainer styling={styles.inputAreaContainer}>
          <Ionicons name="cash-outline" size={24} color="#F50057" />
          <CustomTextInput
            placeholder="Payout (In Koins)"
            value={payout}
            styling={{ padding: "5%", width: "85%" }}
            onChangeText={(val) => setPayout(val)}
            keyboardType="number-pad"
          />
        </InputContainer>
        <InputContainer
          styling={[styles.inputAreaContainer, { padding: "4%" }]}
        >
          <Ionicons name="location-outline" size={24} color="#F50057" />
          <View style={{ padding: "5%", width: "85%" }}>
            {locationInWords === null ? (
              <Typography textSize="h6" textWeight="400">
                Waiting....
              </Typography>
            ) : (
              <Typography textSize="h6" textWeight="400" textColor="neutral">
                {locationInWords}
              </Typography>
            )}
          </View>
        </InputContainer>
        <TouchableOpacity onPress={() => pickImage()}>
          <InputContainer
            styling={[
              styles.inputAreaContainer,
              {
                height: 200,
                width: "100%",
                flexDirection: "column",
                paddingLeft: 0,
                justifyContent: "center",
              },
            ]}
          >
            <View style={{ padding: "5%", alignItems: "center" }}>
              {image === null ? (
                <>
                  <Ionicons name="image-outline" size={24} color="#F50057" />
                  <Typography textSize="h6" textWeight="400">
                    Select an Image (Optional)
                  </Typography>
                </>
              ) : (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>
          </InputContainer>
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
        action={() =>
          Alert.alert("Post this Job?", "", [
            {
              text: "Yes",
              onPress: () => postJob(),
            },
            {
              text: "Cancel",
              onPress: null,
            },
          ])
        }
      >
        <Typography textSize="h4" textColor="white1" textWeight="600">
          Post
        </Typography>
      </PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: "4%",
  },
  inputAreaContainer: {
    marginVertical: "4%",
    paddingLeft: "5%",
  },
});
