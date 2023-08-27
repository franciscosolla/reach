import React from "react";
import { Text } from "react-native";

import AccountNavButton from "../src/components/AccountNavButton";
import HomeNavButton from "../src/components/HomeNavButton";
import Page from "../src/components/Page";

export default function Create() {
  return (
    <Page links={[<HomeNavButton />, <AccountNavButton />]} signed>
      <Text>Create</Text>
    </Page>
  );
}
