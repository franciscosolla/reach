import { Link } from "expo-router";
import { LinkProps } from "expo-router/src/link/Link";

export default function NavButton({ children, ...linkProps }: LinkProps) {
  return <Link {...linkProps}>{children}</Link>;
}
