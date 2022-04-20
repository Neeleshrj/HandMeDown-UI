import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import Typography from "../../ui/Typography";

export default function CustomHeader({ navigation, title }) {
  return (
    <SafeAreaView style={{ backgroundColor: "#fff", flexDirection: 'row'}}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={[styles.leftButtonContainer, { borderWidth: 0 }]}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            color="#000"
            size={heightPercentageToDP(3.5)}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.middleContainer}>
        <Typography textColor="black1" textWeight="600" textSize="h3">
          {title}
        </Typography>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leftContainer: {
    paddingHorizontal: "4%",
    paddingVertical: '4%',
    justifyContent: "center",
  },
  leftButtonContainer: {
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#00648A",
    borderWidth: 2,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "0.5%",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingRight: "4%",
  },
  rightButtonContainer: {
    borderRadius: 100,
    height: 35,
    width: 35,
    justifyContent: "center",
    backgroundColor: "#E5F8FF",
    alignItems: "center",
  },
});
