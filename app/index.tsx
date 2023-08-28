import React from "react";
import { Text } from "react-native";

import Page from "../src/components/Page";

export default function Home() {
  return (
    <Page links={["/create", "/account"]}>
      <Text>Open up App.js to start working on your app!</Text>
    </Page>
  );
}
