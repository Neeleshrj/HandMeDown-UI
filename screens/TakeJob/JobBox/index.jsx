import { View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Typography from "../../../ui/Typography";
import PrimaryButton from "../../../ui/PrimaryButton";
import SecondaryButton from "../../../ui/SecondaryButton";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function JobBox({ data }) {
  return (
    <View style={styles.container}>
      <Typography textSize="h3" textWeight="600" textColor="neutral">
        {data.taskTitle}
      </Typography>
      <View style={{flexDirection: 'row', alignItems:'center',}}>
        <Ionicons 
          name="location-outline"
          color="#000"
          size={heightPercentageToDP(2.5)}
          style={{marginRight: '1%'}}
        />
      <Typography textSize="h4" textWeight="400" textColor="neutral">
        Chennai
        </Typography>
      </View>
      <View style={styles.buttonContainer}>
        <Typography textSize="h3" textWeight="600" textColor="neutral">
          {data.payout}{" "}
        </Typography>
        <Typography textSize="h3" textWeight="400" textColor="neutral">
          Koins
        </Typography>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
        <PrimaryButton styling={{ width: "50%", borderRadius: 8 }}>
          <Typography textSize="h4" textColor="white1" textWeight="400">
            More
          </Typography>
        </PrimaryButton>
        </View>
        
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
    paddingHorizontal: '4%',
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
