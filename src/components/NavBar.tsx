import { ReactElement } from "react";
import { StyleSheet, Text, ViewProps } from "react-native";

import NavButton from "./NavButton";
import Row from "./Row";

export interface NavBarProps extends ViewProps {
  children?: ReactElement<typeof NavButton> | ReactElement<typeof NavButton>[];
}

export default function NavBar({ children, style, ...viewProps }: ViewProps) {
  return (
    <Row style={[styles.container, style]} {...viewProps}>
      <Text>Reach</Text>
      {children}
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
  },
});
