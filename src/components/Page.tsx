import { StyleSheet, ViewProps } from "react-native";
import { StatusBar, StatusBarProps } from 'expo-status-bar';
import ColumnView from "./Column";
import NavBar, { NavBarProps } from "./NavBar";
import { LinkProps } from 'expo-router/src/link/Link';
import NavButton from "./NavButton";

export interface INavBarLink extends Omit<LinkProps, "children"> {
  name: string;
}

export interface PageProps extends ViewProps {
  statusBar?: StatusBarProps;
  contentContainer?: ViewProps;
  navBar?: NavBarProps;
  links?: INavBarLink[];
}

export default function Page({ children, statusBar, contentContainer: { style: contentContainerStyle, ...contentContainer } = {}, navBar: { style: navBarStyle, ...navBar } = {}, links, ...container }: PageProps) {
  return (
    <ColumnView {...container}>
      <StatusBar {...statusBar} />
      <ColumnView style={[styles.contentContainer, contentContainerStyle]} {...contentContainer}>
        {children}
      </ColumnView>
      <NavBar style={[styles.navBar, navBarStyle]} {...navBar}>
        {links?.map(({ name, ...linkProps }) => (
          <NavButton {...linkProps}>
            {name}
          </NavButton>
        ))}
      </NavBar>
    </ColumnView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  navBar: {
    flex: 0,
  }
})