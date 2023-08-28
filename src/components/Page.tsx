import { Redirect } from "expo-router";
import { LinkProps } from "expo-router/src/link/Link";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { StyleSheet, ViewProps } from "react-native";

import ColumnView from "./Column";
import NavBar, { NavBarProps } from "./NavBar";
import { auth } from "../firebase";
import { IRouteKey } from "../routes";

export interface INavBarLink extends Omit<LinkProps, "children"> {
  content: string | JSX.Element;
}

export interface PageProps extends ViewProps {
  statusBar?: StatusBarProps;
  contentContainer?: ViewProps;
  navBar?: NavBarProps;
  links?: IRouteKey[];
  signed?: boolean;
}

export default function Page({
  children,
  statusBar,
  contentContainer: { style: contentContainerStyle, ...contentContainer } = {},
  navBar: { style: navBarStyle, ...navBar } = {},
  links,
  signed,
  ...container
}: PageProps) {
  if (signed && !auth.currentUser) {
    return <Redirect href="/sign" />;
  }

  return (
    <ColumnView {...container}>
      <StatusBar {...statusBar} />
      <ColumnView
        style={[styles.contentContainer, contentContainerStyle]}
        {...contentContainer}
      >
        {children}
      </ColumnView>
      <NavBar style={[styles.navBar, navBarStyle]} {...navBar}>
        {links}
      </NavBar>
    </ColumnView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  navBar: {
    flex: 0,
  },
});
