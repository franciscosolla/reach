import { Ionicons } from "@expo/vector-icons";
import React from "react";

import NavButton from "./NavButton";

export default function CreateNavButton() {
  return (
    <NavButton key="/create" href="/create">
      <Ionicons name="create-outline" size={30} color="black" />
    </NavButton>
  );
}
