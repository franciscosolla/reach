import { StyleSheet, View, ViewProps } from "react-native";

/**
 * `Column` is a utility component for facilitating vertical layouts.
 * It lays out its children in a vertical column.
 */
export default function Column({ children, style, ...viewProps }: ViewProps) {
  return (
    <View style={[styles.column, style]} {...viewProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: "column",
  },
});
