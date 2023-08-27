import { LinkProps } from "expo-router/src/link/Link";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { StyleSheet, ViewProps } from "react-native";

import ColumnView from "./Column";
import NavBar, { NavBarProps } from "./NavBar";
import NavButton from "./NavButton";

export interface INavBarLink extends Omit<LinkProps, "children"> {
  content: string | JSX.Element;
}

export interface PageProps extends ViewProps {
  statusBar?: StatusBarProps;
  contentContainer?: ViewProps;
  navBar?: NavBarProps;
  links?: INavBarLink[];
}

export default function Page({
  children,
  statusBar,
  contentContainer: { style: contentContainerStyle, ...contentContainer } = {},
  navBar: { style: navBarStyle, ...navBar } = {},
  links,
  ...container
}: PageProps) {
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
        {links?.map(({ content, ...linkProps }) => (
          <NavButton {...linkProps}>{content}</NavButton>
        ))}
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
