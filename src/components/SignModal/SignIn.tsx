import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";
import { Button } from "../Button";
import TextInput from "../TextInput";

interface IProps {
  onSignUp: () => void;
}

export const SignIn: React.FC<IProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit = () => signInWithEmailAndPassword(email, password);

  return (
    <>
      <TextInput placeholder="Digite aqui seu email" onChangeText={setEmail} />
      <TextInput
        placeholder="Digite aqui sua senha"
        onChangeText={setPassword}
      />
      <Button text="Entrar" onPress={onSubmit} />
      <Button
        variant="tertiary"
        text="Ainda não tenho conta"
        onPress={onSignUp}
      />
    </>
  );
};
