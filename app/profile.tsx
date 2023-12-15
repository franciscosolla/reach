import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, View, Text } from "react-native";
import Colors from "../src/colors";
import { Home } from "../src/svg/Home";
import { Profile as ProfileIcon } from "../src/svg/Profile";
import { Link, Redirect } from "expo-router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";
import { pressable } from "../src/styles/button";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  if (!loading && !user) {
    return <Redirect href="/signUp" />
  }
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.surface.background} style="dark" />
      <View style={styles.profile}>
        <Text style={styles.username}>{`@${user.displayName}`}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.actions}>
        <View style={{ flex: 2 }} />
        <Pressable style={(state) => ({
            ...pressable(state),
            ...styles.actionButton,
          })}
          onPress={signOut}
        >
          <Text style={styles.actionText}>Sair</Text>
        </Pressable>
        <View style={{ flex: 1 }} />
      </View>
      <View style={styles.navBar}>
        <View style={{ flex: 2 }} />
        <Link href="/" asChild>
          <Pressable
            style={pressable}
          >
            <Home />
          </Pressable>
        </Link>
        <ProfileIcon active />
        <View style={{ flex: 1 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.surface.background,
    paddingHorizontal: 40,
    paddingBottom: 16,
    paddingTop: 32,
    gap: 32
  },
  profile: {
    flex: 1,
    gap: 8,
  },
  username: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.surface.text.primary,
  },
  email: {
    fontSize: 12,
    color: Colors.surface.text.primary,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    backgroundColor: Colors.button.background,
    padding: 12,
    aspectRatio: 1,
    minWidth: 80,
    borderRadius: 16,
  },
  actionText: {
    color: Colors.button.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});