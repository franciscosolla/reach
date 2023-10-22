import {
  DocumentReference,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { geohashQueryBounds } from "geofire-common";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Colors from "../src/colors";
import Column from "../src/components/Column";
import { H1 } from "../src/components/H1";
import Page from "../src/components/Page";
import Text from "../src/components/Text";
import { Post } from "../src/data";
import { db } from "../src/firebase";
import { getCurrentCoordinates } from "../src/location";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <Page links={["/create", "/", "/account"]}>
      <ScrollView>
        <Column style={styles.container}>
          <H1>Agora</H1>
          {posts
            ? posts.map((post) => (
                <Column key={post.id} style={styles.contentContainer}>
                  <Text>{post.text}</Text>
                </Column>
              ))
            : null}
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

const radiusInMeters = 1000;

const getPosts = (): Promise<Post[]> =>
  getCurrentCoordinates()
    .then((coordinates) =>
      Promise.all(
        geohashQueryBounds(coordinates, radiusInMeters).map((geoHashRange) =>
          getDocs(
            query(
              collection(db, "action"),
              orderBy("createdAt"),
              where("geohash", ">=", geoHashRange[0]),
              where("geohash", "<=", geoHashRange[1]),
            ),
          ),
        ),
      ),
    )
    .then((snapshots) =>
      [
        ...(snapshots
          .flatMap((snapshot) => snapshot.docs.map((doc) => doc.data()))
          .reduce((postRefs, action) => {
            postRefs.add(action.ref);
            return postRefs;
          }, new Set<DocumentReference>()) as Set<DocumentReference>),
      ].slice(0, 30),
    )
    .then((postRefs) =>
      getDocs(query(collection(db, "post"), where("ref", "in", postRefs))),
    )
    .then((snapshots) =>
      snapshots.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Post,
      ),
    );
