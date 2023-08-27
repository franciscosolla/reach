import React from "react";
import { Text } from "react-native";

import AccountNavButton from "../src/components/AccountNavButton";
import CreateNavButton from "../src/components/CreateNavButton";
import Page from "../src/components/Page";

export default function App() {
  return (
    <Page links={[<CreateNavButton />, <AccountNavButton />]}>
      <Text>Open up App.js to start working on your app!</Text>
    </Page>
  );
}
