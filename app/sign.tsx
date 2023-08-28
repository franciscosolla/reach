import { Link, Redirect } from "expo-router";
import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { TextInput, StyleSheet, Pressable, Text } from "react-native";

import Column from "../src/components/Column";
import Page from "../src/components/Page";
import { auth } from "../src/firebase";

export default function Sign() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInWithEmailAndPassword, user] =
    useSignInWithEmailAndPassword(auth);

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Page links={["/", "/account"]}>
      <Column style={styles.container}>
        <TextInput placeholder="E-mail" onChangeText={setEmail} />
        <TextInput placeholder="Password" onChangeText={setPassword} />
        <Pressable onPress={() => signInWithEmailAndPassword(email, password)}>
          <Text>Sign in</Text>
        </Pressable>
        <Link href="/signup">Sign up</Link>
      </Column>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
