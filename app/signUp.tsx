import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Colors from "../src/colors";
import { SpeechBubble } from "../src/svg/SpeechBubble";
import { Email } from "../src/svg/Email";
import { User } from "../src/svg/User";
import { Key } from "../src/svg/Key";
import { Arrow } from "../src/svg/Arrow";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth, db } from "../src/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, Redirect } from "expo-router";
import { pressable } from "../src/styles/button";
import { input, textInput } from "../src/styles/input";


export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [updateProfile] = useUpdateProfile(auth);

  const onSubmit = () => {
    if (isLoading || !email || !username || !password || !confirm || password !== confirm || !validateEmail(email) || !validateUsername(username) || !validatePassword(password)) return;
    
    setIsLoading(true);
    
    createUserWithEmailAndPassword(email, password).then(userCredential => Promise.all([updateProfile({ displayName: username }), setDoc(doc(db, "users", userCredential.user.uid), { username, email })])).finally(() => setIsLoading(false));
  };

  const [user] = useAuthState(auth);

  if (!isLoading && user) {
    return <Redirect href="/" />
  }

  return (
    <View style={styles.container}>
      <SpeechBubble />
      <Input
        icon={<Email />}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        icon={<User />}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Input
        icon={<Key />}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        icon={<Key />}
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
      />
      <View style={styles.actions}>
        <Link href="/signIn" asChild>
          <Pressable style={pressable}>
            <Text style={{ fontWeight: "bold", color: Colors.surface.text.primary }}>Entrar</Text>
          </Pressable>
        </Link>
        <Pressable onPress={onSubmit} style={pressable}>
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

