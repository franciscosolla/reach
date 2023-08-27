import { StyleSheet, View, ViewProps } from "react-native";

/**
 * `Row` is a utility component for facilitating horizontal layouts.
 * It lays out its children in a horizontal row.
 */
export default function Row({ children, style, ...viewProps }: ViewProps) {
  return (
    <View style={[styles.row, style]} {...viewProps}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
