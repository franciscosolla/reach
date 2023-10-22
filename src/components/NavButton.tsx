import { Link } from "expo-router";
import { LinkProps } from "expo-router/src/link/Link";
import { PropsWithChildren } from "react";
import { Pressable, StyleSheet } from "react-native";

export interface NavButtonProps {
  href: LinkProps["href"];
  userRole?: "guest" | "user";
}

export const NavButton: React.FC<PropsWithChildren<NavButtonProps>> = ({
  children,
  href,
  userRole,
}) => {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.link}>{children}</Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  link: {
    minHeight: 42,
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
