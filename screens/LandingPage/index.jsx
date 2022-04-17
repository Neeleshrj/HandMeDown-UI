import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { heightPercentageToDP } from "react-native-responsive-screen";

import Landing from "../../assets/landing.png";

import Typography from "../../ui/Typography";

export default function LandingPage({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image source={Landing} style={{ width: "100%", height: "60%" }} />
        <View style={{ paddingHorizontal: "4%" }}>
          <Typography textSize="h1" textColor="black1" textWeight="600">
            Find Odd Jobs from the comfort of your phone
          </Typography>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons
            name="chevron-forward-outline"
            size={heightPercentageToDP(4)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: '20%'
  },
  upperContainer: {
    flex: 0.8,
  },
  button: {
    backgroundColor: "#F50057",
    alignItems: "center",
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent: "center",
    marginRight: "2%",
    elevation: 10,
  },
  lowerContainer: {
    flex: 0.2,
    alignItems: "flex-end",
  },
});
