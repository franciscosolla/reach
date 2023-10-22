import { Redirect } from "expo-router";
import { LinkProps } from "expo-router/src/link/Link";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyleSheet, ViewProps } from "react-native";

import Column from "./Column";
import NavBar, { NavBarProps } from "./NavBar";
import SignModal, { useSignModal } from "./SignModal";
import Colors from "../colors";
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
  userRole?: "guest" | "user";
}

export default function Page({
  children,
  statusBar: {
    style: statusBasrStyle,
    backgroundColor: statusBarBackgroundColor,
    ...statusBar
  } = {},
  contentContainer: { style: contentContainerStyle, ...contentContainer } = {},
  navBar: { style: navBarStyle, ...navBar } = {},
  links,
  userRole,
  style,
  ...container
}: PageProps) {
  const [user] = useAuthState(auth);
  const { openSignModal } = useSignModal();

  useEffect(() => {
    if (userRole === "user" && !user) {
      return openSignModal;
    }
  }, [userRole, user]);

  if (userRole === "user" && !user) {
    return <Redirect href="/" />;
  }

  return (
    <Column style={[styles.container, style]} {...container}>
      <StatusBar
        style={statusBasrStyle ?? "dark"}
        backgroundColor={
          statusBarBackgroundColor ?? Colors.surface.background.primary
        }
        {...statusBar}
      />
      <Column
        style={[styles.contentContainer, contentContainerStyle]}
        {...contentContainer}
      >
        {children}
      </Column>
      <NavBar style={[styles.navBar, navBarStyle]} {...navBar}>
        {links}
      </NavBar>
      <SignModal />
    </Column>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface.background.secondary,
  },
  contentContainer: {
    flex: 1,
  },
  navBar: {
    flex: 0,
  },
});
