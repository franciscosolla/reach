import React from "react";
import { StyleSheet, Text, ViewProps } from "react-native";

import NavButton from "./NavButton";
import Row from "./Row";
import routes, { IRouteKey } from "../routes";

export interface NavBarProps extends ViewProps {
  children?: IRouteKey[];
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
        {children.map((route) => (
          <NavButton key={route} href={route} userRole={routes[route].userRole}>
            {routes[route].icon}
          </NavButton>
        ))}
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
