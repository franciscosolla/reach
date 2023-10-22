import { router } from "expo-router";
import React from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "../src/colors";
import { Button } from "../src/components/Button";
import Column from "../src/components/Column";
import { H1 } from "../src/components/H1";
import Page from "../src/components/Page";
import Text from "../src/components/Text";
import { auth } from "../src/firebase";

export default function Account() {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <Page links={["/create", "/", "/account"]} userRole="user">
      <ScrollView>
        <Column style={styles.container}>
          <H1>Usuário</H1>
          <Column style={styles.contentContainer}>
            <Text>Display Name: {user?.displayName}</Text>
            <Text>Email: {user?.email}</Text>
            <Text>Photo URL: {user?.photoURL}</Text>
            <Text>Phone Number: {user?.phoneNumber}</Text>
            <Text>Provider ID: {user?.providerId}</Text>
            <Text>UID: {user?.uid}</Text>
            <Text>Email verificado: {user?.emailVerified ? "Sim" : "Não"}</Text>
            <Text>Anonimo: {user?.isAnonymous}</Text>
          </Column>
          <Button
            onPress={() => {
              router.push("/");
              signOut();
            }}
            text="Sair"
          />
          <Column style={styles.contentContainer}>
            <Text>{JSON.stringify(user, null, 4)}</Text>
          </Column>
        </Column>
      </ScrollView>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  contentContainer: {
    padding: 20,
    gap: 8,
    backgroundColor: Colors.surface.background.primary,
  },
});
