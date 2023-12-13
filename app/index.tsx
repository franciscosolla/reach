import React, { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View, Text, ActivityIndicator } from "react-native";

import Colors from "../src/colors";
import { app, auth, db } from "../src/firebase";
import { getCurrentGeoHash } from "../src/location";
import { Link, Redirect } from "expo-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { StatusBar } from "expo-status-bar";
import { Home as HomeIcon } from "../src/svg/Home";
import { Profile } from "../src/svg/Profile";
import { Arrow } from "../src/svg/Arrow";
import { getFunctions, httpsCallable } from "firebase/functions";
import { DocumentReference, Timestamp, doc } from "firebase/firestore";
import { FlatList } from "react-native-gesture-handler";
import { usePostPaths, usePost, useCreatePost } from "../src/hooks/usePosts";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const postsRef = useRef<{reload: () => Promise<void>}>(null);

  if (!loading && !user) {
    return <Redirect href="/signUp" />
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.surface.background} />
      <Posts ref={postsRef} />
      <Input onSubmit={() => postsRef.current?.reload()} />
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

const getElapsedTimeText = (timestamp: number) => {
  const elapsed = (Date.now() - timestamp) / 1000;

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



const Post: React.FC<{ path: string; onLoad?: () => void }> = ({ path, onLoad }) => {
  const post = usePost(path);

  useEffect(() => {
    if (post && onLoad) {
      onLoad()
    }
  }, [post, onLoad]);

  if (!post) {
    return null;
  }

  return (
    <View style={styles.post}>
      <Text>
        <Text style={styles.username}>{`@${post.username}`}</Text>
        <Text style={styles.postText}>{` ${post.text} `}</Text>
        <Text style={styles.postTime}>{getElapsedTimeText(post.createdAt)}</Text>
      </Text>
    </View>
  );
};

const Posts = forwardRef<{reload: () => Promise<void>}>((_, ref) => {
  const { paths, load: loadPostPaths, isLoading, updatedAt } = usePostPaths();
  const [hasContent, setHasContent] = useState(false);

  useEffect(() => {
    if (!updatedAt || (Date.now() - updatedAt > 1000 * 60)) {
      loadPostPaths();
    }
  }, []);

  useImperativeHandle(ref, () => ({
    reload: loadPostPaths,
  }), []);

  return (
    <View style={styles.posts}>
      <FlatList
        data={paths}
        renderItem={({ item: path }) => <Post path={path} onLoad={!hasContent ? () => setHasContent(true) : undefined} />}
        keyExtractor={(path) => path}
        inverted
        ListHeaderComponent={isLoading || !hasContent ? <ActivityIndicator size="large" color={Colors.loading} /> : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
});

const createPost = httpsCallable<{ text: string; geohash: string }, string>(getFunctions(app), "createPost");

const Input: React.FC<{ onSubmit?: () => void }> = (props) => {
  const [text, setText] = useState("");

  const [createPost, isLoading] = useCreatePost();

  const onSubmit = async () => {
    await createPost(text);
    setText("");
    props.onSubmit?.();
  }
  return (
    <View style={styles.input}>
      <TextInput
        style={{ color: Colors.input.text, flex: 1, paddingVertical: 8 }}
        value={text}
        onChangeText={setText}
        cursorColor={Colors.input.cursor}
        multiline
        editable={!isLoading}
      />
      <Pressable
        style={({ pressed }) => ({
          opacity: !text ? 0 : pressed ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        })}
        onPress={onSubmit}
        disabled={!text}
      >
        {isLoading ? <ActivityIndicator size="small" color={Colors.loading} /> : <Arrow />}
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
    justifyContent: "flex-end",
  },
  post: {
    marginVertical: 4,
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
