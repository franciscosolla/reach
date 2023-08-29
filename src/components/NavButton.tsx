import { Link } from "expo-router";
import { LinkProps } from "expo-router/src/link/Link";
import { useAuthState } from "react-firebase-hooks/auth";

import { useSignModal } from "./SignModal";
import { auth } from "../firebase";

export interface NavButtonProps extends LinkProps {
  userRole?: "guest" | "user";
}

export default function NavButton({
  children,
  userRole,
  ...linkProps
}: NavButtonProps) {
  const [user] = useAuthState(auth);

  const { openSignModal } = useSignModal();

  const href = userRole === "user" && !user ? undefined : linkProps.href;

  return (
    <Link href={href} onPress={openSignModal} {...linkProps}>
      {children}
    </Link>
  );
}
