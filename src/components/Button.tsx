import React, { PropsWithChildren } from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

import Colors from "../colors";

interface IProps extends PressableProps {
  variant?: "primary" | "secondary" | "tertiary";
  text?: string;
}

export const Button: React.FC<PropsWithChildren<IProps>> = ({
  variant,
  text,
  children,
  ...props
}) => (
  <Pressable style={styles[variant ?? "primary"]} {...props}>
    {text ? <Text style={styles[variant ?? "primary"]}>{text}</Text> : children}
  </Pressable>
);

const baseStyles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
});

const styles = StyleSheet.create({
  primary: {
    ...baseStyles.base,
    backgroundColor: Colors.button.background.primary,
    color: Colors.button.text.primary,
  },

  secondary: {
    ...baseStyles.base,
    backgroundColor: Colors.button.background.secondary,
    color: Colors.button.text.secondary,
  },

  tertiary: {
    ...baseStyles.base,
    color: Colors.button.text.tertiary,
    textDecorationLine: "underline",
  },
});
