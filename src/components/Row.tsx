import { StyleSheet, View, ViewProps } from "react-native";

interface IProps extends ViewProps {
  gap?: number;
}

/**
 * `Row` is a utility component for facilitating horizontal layouts.
 * It lays out its children in a horizontal row.
 */
export const Row: React.FC<IProps> = ({
  children,
  style,
  gap,
  ...viewProps
}) => {
  return (
    <View style={[styles.row, style, { gap }]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
});
