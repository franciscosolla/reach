import {
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeTextInputProps,
  StyleSheet,
  ViewProps,
} from "react-native";

import { Row } from "./Row";
import Colors from "../colors";

export interface TextInputProps extends ReactNativeTextInputProps {
  style?: ViewProps["style"];
}

export default function TextInput({
  style,
  children,
  placeholderTextColor,
  ...props
}: TextInputProps) {
  return (
    <Row style={[styles.container, style]}>
      <ReactNativeTextInput
        style={styles.textInput}
        placeholderTextColor={
          placeholderTextColor ?? Colors.surface.text.secondary
        }
        {...props}
      />
      {children}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface.background.secondary,
    borderRadius: 20,
    paddingRight: 10,
    alignItems: "center",
  },
  textInput: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    color: Colors.surface.text.secondary,
    padding: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
});
