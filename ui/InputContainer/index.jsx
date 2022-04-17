import { View, StyleSheet } from "react-native";

export default function InputContainer({ styling,children }) {
  return <View style={[styles.container,styling]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    elevation: 5,
    borderRadius: 16,
    // padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
