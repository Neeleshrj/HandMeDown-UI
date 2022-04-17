import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const width = Dimensions.get('window').width;

export default function Typography({ textSize, textColor, textWeight, children }) {

  const themeTextSize =
    textSize === "h1"
      ? styles.h1
      : textSize === "h2"
      ? styles.h2
      : textSize === "h3"
      ? styles.h3
      : textSize === "h4"
      ? styles.h4
      : textSize === "h5"
      ? styles.h5
      : textSize === "h6"
      ? styles.h6
      : styles.p;
  const themeTextColor =
    textColor === "black1"
      ? styles.black1
      : textColor === "grey1"
      ? styles.grey1
      : textColor === "white1"
      ? styles.white1
      : textColor === "blue1"
      ? styles.blue1
      : textColor === "blue2"
      ? styles.blue2
      : textColor === "green1"
      ? styles.green1
      : textColor === "neutral"
      ? styles.neutral
      : textColor === "error1"
      ? styles.error1
      : textColor === "error2"
      ? styles.error2
      : styles.black1;
  
  const themeTextWeight = 
  textWeight === "800"
      ? "OpenSans_800ExtraBold"
      : textWeight === "700"
      ? "OpenSans_700Bold"
      : textWeight === "600"
      ? "OpenSans_600SemiBold"
      : textWeight === "400"
      ? "OpenSans_400Regular"
      : "OpenSans_300Light";

    return <Text style={[themeTextColor, themeTextSize, {letterSpacing: 0.5, fontFamily: themeTextWeight,paddingVertical: '1%'}]}>{children}</Text>;
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 0.1*width,
  },
  h2: {
    fontSize: 0.08*width,
  },
  h3: {
    fontSize: 0.05*width,
  },
  h4: {
    fontSize: 0.04*width,
  },
  h5: {
    fontSize: 0.035*width,
  },
  h6: {
    fontSize: 12,
  },
  p: {
    fontSize: 10,
  },
  //color
  black1: {
    color: "#262626",
  },
  white1: {
    color: "#ffffff",
  },
  grey1: {
    color: "#808080",
  },
  blue1: {
    color: "#00AEEF"
  },
  blue2: {
    color: "#00648A",
  },
  green1: {
    color: "#66CC33",
  },
  neutral: {
    color: "#41484D",
  },
  error1: {
    color: "#DD3730",
  },
  error2: {
    color: "#6B0001"
  }
});
