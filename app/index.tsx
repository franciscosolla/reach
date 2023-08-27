import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";

import Page from "../src/components/Page";

export default function App() {
  return (
    <Page
      links={[
        {
          href: "/create",
          content: <Ionicons name="create-outline" size={24} color="black" />,
        },
        {
          href: "/account",
          content: <MaterialIcons name="account-box" size={24} color="black" />,
        },
      ]}
    >
      <Text>Open up App.js to start working on your app!</Text>
    </Page>
  );
}
