import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

import NavButton from "./NavButton";

export default function AccountNavButton() {
  return (
    <NavButton key="/account" href="/account">
      <MaterialIcons name="account-box" size={30} color="black" />
    </NavButton>
  );
}
