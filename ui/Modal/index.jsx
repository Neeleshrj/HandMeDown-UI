import { View, Modal, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function ModalContainer({ modalVisible, styling, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.modalContainer,styling]}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#f7f7f7",
    width: widthPercentageToDP(90),
    // alignSelf: 'center',
    padding: "5%",
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
  },
});