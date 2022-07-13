import { StyleSheet } from "react-native";
import { Spacing } from "../../styles/base";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  title: {
    textAlign: "center",
  },
  textInput: {
    marginVertical: Spacing.sm,
  },
  actionButton: {
    marginVertical: Spacing.sm,
  },
});

export default styles;
