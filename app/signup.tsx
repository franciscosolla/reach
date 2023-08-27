import { Link, Redirect } from "expo-router";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { TextInput, StyleSheet, Pressable, Text } from "react-native";

import AccountNavButton from "../src/components/AccountNavButton";
import Column from "../src/components/Column";
import HomeNavButton from "../src/components/HomeNavButton";
import Page from "../src/components/Page";
import { auth } from "../src/firebase";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Page links={[<HomeNavButton />, <AccountNavButton />]}>
      <Column style={styles.container}>
        <TextInput placeholder="E-mail" onChangeText={setEmail} />
        <TextInput placeholder="Password" onChangeText={setPassword} />
        <TextInput
          placeholder="Confirm password"
          onChangeText={setConfirmPassword}
        />
        <Pressable
          onPress={() =>
            password === confirmPassword
              ? createUserWithEmailAndPassword(email, password)
              : null
          }
        >
          <Text>Sign up</Text>
        </Pressable>
        <Link href="/sign">Sign in</Link>
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
