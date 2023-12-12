import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Colors from "../src/colors";
import { SpeechBubble } from "../src/svg/SpeechBubble";
import { Email } from "../src/svg/Email";
import { User } from "../src/svg/User";
import { Key } from "../src/svg/Key";
import { Arrow } from "../src/svg/Arrow";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../src/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { input, textInput } from "../src/styles/input";


export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit = () => {
    if (isLoading || !username || !password || (!validateEmail(username) && !validateUsername(username)) || !validatePassword(password)) return;
    
    setIsLoading(true);
    
    if (validateEmail(username)) {
        signInWithEmailAndPassword(username, password).finally(() => setIsLoading(false));
    } else {
        getDocs(query(collection(db, "users"), where("username", "==", username))).then((querySnapshot) => {
            if (querySnapshot.size === 0) return;
            return signInWithEmailAndPassword(querySnapshot.docs[0].data().email, password).finally(() => setIsLoading(false));
        });
    }
  };

  const [user] = useAuthState(auth);

  if (!isLoading && user) {
    return <Redirect href="/" />
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.surface.background} />
      <SpeechBubble />
      <Input
        icon={!username.length || validateUsername(username) ? <User /> : <Email />}
        value={username}
        onChangeText={setUsername}
        keyboardType={!username.length || validateUsername(username) ? "default" : "email-address"}
        autoCapitalize="none"
      />
      <Input
        icon={<Key />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.actions}>
        <Link href="/signUp" asChild>
          <Pressable
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            })}
          >
            <Text style={{ fontWeight: "bold", color: Colors.surface.text.primary }}>Cadastrar</Text>
          </Pressable>
        </Link>
        <Pressable
          onPress={onSubmit}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <Arrow />
        </Pressable>
      </View>
    </View>
  )
}

interface IInputProps extends TextInputProps {
  icon?: JSX.Element;
}

const Input: React.FC<Omit<IInputProps, "style">> = ({ icon = null, ...props }) => {
  return (
    <View style={input}>
      {icon}
      <TextInput
        cursorColor={Colors.input.cursor}
        style={textInput}
        {...props}
      />
    </View>
  );
}

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9._]{1,24}$/;
  return regex.test(username);
}

const validatePassword = (password) => {
  const regex = /^\S{6,}$/;
  return regex.test(password);
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.surface.background,
    flexDirection: "column",
    gap: 16,
    paddingHorizontal: 40,
    paddingVertical: 16,
    flex: 1,
    justifyContent: "flex-end",
    alignContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    alignItems: "center",
    width: "100%",
  }
});

