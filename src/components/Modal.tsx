import React from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";

import Column from "./Column";
import Colors from "../colors";

export interface ModalProps extends ViewProps {
  open: boolean;
  onClose: () => void;
}

export default function Modal({
  children,
  open,
  onClose,
  style,
  ...container
}: ModalProps) {
  if (!open) return null;

  return (
    <Column style={styles.container}>
      <Pressable style={styles.background} onPress={onClose} />
      <Column style={[styles.contentContainer, style]} {...container}>
        <Pressable style={styles.topAnchorButton} onPress={onClose}>
          <View style={styles.topAnchor} />
        </Pressable>
        {children}
      </Column>
    </Column>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.3,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.surface.background.primary,
    alignItems: "center",
    padding: 10,
    paddingTop: 0,
    gap: 10,
  },
  topAnchorButton: {
    padding: 10,
    width: 100,
  },
  topAnchor: {
    borderRadius: 10,
    height: 5,
    width: 100,
    backgroundColor: Colors.button.background.primary,
  },
});
