import React from "react";
import { Text } from "react-native";

import Page from "../src/components/Page";

export default function Account() {
  return (
    <Page links={["/", "/account"]} signed>
      <Text>Account</Text>
    </Page>
  );
}
