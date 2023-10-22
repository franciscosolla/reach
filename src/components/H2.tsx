import React, { PropsWithChildren } from "react";
import { StyleSheet, TextProps } from "react-native";

import Text from "./Text";

export const H2: React.FC<PropsWithChildren<TextProps>> = ({
  style,
  ...props
}) => <Text style={[styles.h2, style]} {...props} />;

const styles = StyleSheet.create({
  h2: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
