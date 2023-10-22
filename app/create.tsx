import { doc, serverTimestamp, writeBatch } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ScrollView, StyleSheet } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import Colors from "../src/colors";
import { Button } from "../src/components/Button";
import Column from "../src/components/Column";
import { H1 } from "../src/components/H1";
import { H2 } from "../src/components/H2";
import Page from "../src/components/Page";
import TextInput from "../src/components/TextInput";
import { auth, db } from "../src/firebase";
import { getCurrentGeoHash } from "../src/location";

export default function Create() {
  const [user] = useAuthState(auth);
  const [text, setText] = useState("");

  const onSend = () =>
    getCurrentGeoHash()
      .then((geohash) => {
        const batch = writeBatch(db);

        const ref = doc(db, "post", uuidv4());

        batch.set(ref, {
          geohash,
          text,
          createdBy: user?.uid,
          createdAt: serverTimestamp(),
        });

        batch.set(doc(db, "action", uuidv4()), {
          geohash,
          type: "CREATE",
          ref,
          createdAt: serverTimestamp(),
        });

        return batch.commit();
      })
      .then(() => setText(""));

  return (
    <Page links={["/create", "/", "/account"]} userRole="user">
      <ScrollView>
        <Column style={styles.container}>
          <H1>Crie</H1>
          <Column style={styles.contentContainer}>
            <H2>Publicação</H2>
            <TextInput
              placeholder="Digite aqui sua mensagem"
              onChangeText={setText}
            />
            <Button text="Enviar" onPress={onSend} />
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
