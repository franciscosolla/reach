import { Text, TextProps, StyleSheet } from "react-native";

import Colors from "../colors";

export default function ({ children, style, ...props }: TextProps) {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.surface.text.primary,
  },
});
