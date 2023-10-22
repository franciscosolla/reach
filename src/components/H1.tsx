import React, { PropsWithChildren } from "react";
import { StyleSheet, TextProps } from "react-native";

import Text from "./Text";

export const H1: React.FC<PropsWithChildren<TextProps>> = ({
  style,
  ...props
}) => <Text style={[styles.h1, style]} {...props} />;

const styles = StyleSheet.create({
  h1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
