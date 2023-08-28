import { Link, router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { TextInput, StyleSheet, Pressable, Text } from "react-native";

import Column from "../src/components/Column";
import Page from "../src/components/Page";
import { auth, db } from "../src/firebase";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const signUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          if (userCredential.user) {
            Promise.all([
              updateProfile(userCredential.user, { displayName: username }),
              setDoc(doc(db, "users", userCredential.user.uid), {
                username,
                email,
              }),
            ]).then(() => router.push("/"));
          }
        },
      );
    }
  };

  return (
    <Page links={["/", "/account"]}>
      <Column style={styles.container}>
        <TextInput placeholder="E-mail" onChangeText={setEmail} />
        <TextInput placeholder="username" onChangeText={setUsername} />
        <TextInput placeholder="Password" onChangeText={setPassword} />
        <TextInput
          placeholder="Confirm password"
          onChangeText={setConfirmPassword}
        />
        <Pressable onPress={signUp}>
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
