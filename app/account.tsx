import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";

import Page from "../src/components/Page";

export default function Account() {
  return (
    <Page
      links={[
        {
          href: "/",
          content: <Ionicons name="home-outline" size={24} color="black" />,
        },
        {
          href: "/account",
          content: <MaterialIcons name="account-box" size={24} color="black" />,
        },
      ]}
    >
      <Text>Account</Text>
    </Page>
  );
}
