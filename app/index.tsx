import React, { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";

import Colors from "../src/colors";
import { app, auth, db } from "../src/firebase";
import { getCurrentCoordinates, getCurrentGeoHash } from "../src/location";
import { Link, Redirect } from "expo-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { StatusBar } from "expo-status-bar";
import { Home as HomeIcon } from "../src/svg/Home";
import { Profile } from "../src/svg/Profile";
import { Arrow } from "../src/svg/Arrow";
import { getFunctions, httpsCallable } from "firebase/functions";
import { DocumentReference, Timestamp, doc } from "firebase/firestore";
import { IPost } from "../src/data/post";
import { IUser } from "../src/data/user";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const postsHandler = useRef<{reload: () => Promise<void>}>(null).current;

  if (!loading && !user) {
    return <Redirect href="/signUp" />
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.surface.background} />
      <Posts />
      <Input onSubmit={() => postsHandler?.reload()} />
      <View style={styles.navBar}>
        <View style={{ flex: 2 }} />
        <HomeIcon active />
        <Link href="/profile" asChild>
          <Pressable
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Profile />
          </Pressable>
        </Link>
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const getElapsedTimeText = (timestamp: Timestamp) => {
  const elapsed = (Date.now() - timestamp.toMillis()) / 1000;

  if (elapsed < 60) {
    return `${Math.floor(elapsed)}s`;
  }

  if (elapsed < 3600) {
    return `${Math.floor(elapsed / 60)}m`;
  }

  if (elapsed < 86400) {
    return `${Math.floor(elapsed / 3600)}h`;
  }

  return `${Math.floor(elapsed / 86400)}d`;
}

const Post: React.FC<{ path: string }> = ({ path }) => {
  const [post] = useDocumentData(doc(db, path) as DocumentReference<IPost>, { snapshotOptions: {} });
  const [user] = useDocumentData(post?.createdBy ? doc(db, "users", post.createdBy) as DocumentReference<IUser> : undefined);

  if (!post || !user) {
    return null;
  }

  return (
    <Text>
      <Text style={styles.username}>{`@${user?.username}`}</Text>
      <Text style={styles.postText}>{` ${post.text} `}</Text>
      <Text style={styles.postTime}>{getElapsedTimeText(post.createdAt)}</Text>
    </Text>
  )
};

const Posts: React.FC = forwardRef<{reload: () => Promise<void>}>((_, ref) => {
  const [posts, setPosts] = useState([]);

  const loadPosts = useCallback(() => getCurrentCoordinates().then(
    ([latitude, longitude]) => httpsCallable<{ latitude, longitude }, string[]>(getFunctions(app), "getPosts")({ latitude, longitude })
      .then((result) => setPosts(result.data))
  ), []);

  useEffect(() => {
    loadPosts();
  }, []);

  useImperativeHandle(ref, () => ({
    reload: loadPosts,
  }), []);

  return (
    <View style={styles.posts}>
      {posts.reverse().map((post) => (
        <Post path={post} key={post} />
      ))}
    </View>
  )
});

const Input: React.FC<{ onSubmit?: () => void }> = (props) => {
  const [text, setText] = useState("");

  const onSubmit = () =>
    getCurrentGeoHash()
      .then((geohash) => httpsCallable(getFunctions(app), "createPost")({ text, geohash }))
      .then(() => setText(""))
      .then(() => props.onSubmit?.())
      .catch((error) => console.log(error));

  return (
    <View style={styles.input}>
      <TextInput
        style={{ color: Colors.input.text, flex: 1, paddingVertical: 8 }}
        value={text}
        onChangeText={setText}
        cursorColor={Colors.input.cursor}
        multiline
      />
      <Pressable
        style={({ pressed }) => ({
          opacity: !text ? 0 : pressed ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
        onPress={onSubmit}
        disabled={!text}
      >
        <Arrow />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingBottom: 16,
    paddingTop: 32,
    backgroundColor: Colors.surface.background,
    width: "100%",
    height: "100%",
    gap: 24,
  },
  posts: {
    flex: 1,
    gap: 8,
    color: Colors.surface.text.primary,
  },
  postText: {
    color: Colors.surface.text.primary,
  },
  postTime: {
    color: Colors.surface.text.secondary,
    fontSize: 10,
    opacity: 0.5,
  },
  username: {
    color: Colors.surface.text.primary,
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 16,
    backgroundColor: Colors.input.background,
    borderRadius: 24,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
