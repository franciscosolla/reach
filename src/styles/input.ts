import { TextStyle, ViewStyle } from "react-native";
import Colors from "../colors";

export const input: ViewStyle = {
  backgroundColor: Colors.input.background,
  borderRadius: 24,
  paddingHorizontal: 16,
  paddingVertical: 6,
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
};

export const textInput: TextStyle = { color: Colors.input.text, flex: 1 };