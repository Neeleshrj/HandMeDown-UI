import { View, StyleSheet } from "react-native";

import Typography from "../../../ui/Typography";

export default function ActiveJobBox({ data }) {
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
      <Typography textSize="h4" textWeight="400" textColor="neutral">
        Payout: {data.payout}
      </Typography>
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
