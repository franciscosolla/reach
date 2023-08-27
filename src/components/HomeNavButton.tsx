import { Ionicons } from "@expo/vector-icons";
import React from "react";

import NavButton from "./NavButton";

export default function HomeNavButton() {
  return (
    <NavButton key="/" href="/">
      <Ionicons name="home-outline" size={30} color="black" />
    </NavButton>
  );
}
