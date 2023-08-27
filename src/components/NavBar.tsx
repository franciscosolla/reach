import { ReactElement } from "react";
import { StyleSheet, Text, ViewProps } from "react-native";

import NavButton from "./NavButton";
import Row from "./Row";

export interface NavBarProps extends ViewProps {
  children?: ReactElement<typeof NavButton> | ReactElement<typeof NavButton>[];
  links?: ViewProps;
}

export default function NavBar({
  children,
  style,
  links: { style: linksStyle, ...links } = {},
  ...viewProps
}: NavBarProps) {
  return (
    <Row style={[styles.container, style]} {...viewProps}>
      <Text>Reach</Text>
      <Row style={[styles.links, linksStyle]} {...links}>
        {children}
      </Row>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingRight: 40,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  links: {
    flex: 0,
    gap: 20,
  },
});
