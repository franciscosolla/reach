import { PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";

export const pressable: ((state: PressableStateCallbackType) => ViewStyle) = ({ pressed }) => ({
  opacity: pressed ? 0.5 : 1,
  transform: [{ scale: pressed ? 0.95 : 1 }],
})