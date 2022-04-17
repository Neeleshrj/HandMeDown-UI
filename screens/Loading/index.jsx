import { View, StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

import Typography from "../../ui/Typography";

export default function Loading() {

  return (
    <View style={styles.loader}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,1)"
        animationStyle={{height: '80%', width: '50%', justifyContent: 'center', alignItems: 'center'}}
        source={require("../../assets/loader.json")}
        speed={0.5}
        loop={true}
      >
        <View style={{ flexDirection: "row" }}>
        <Typography textColor="primary" textWeight="700" textSize="h2">
            Hand Me Down
        </Typography>
      </View>
      </AnimatedLoader>
      
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
