import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";
import { Button } from "../Button";
import TextInput from "../TextInput";

interface IProps {
  onSignIn: () => void;
}

export const SignUp: React.FC<IProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = () => {
    if (password === passwordConfirmation) {
      createUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <>
      <TextInput placeholder="Digite aqui seu email" onChangeText={setEmail} />
      <TextInput
        placeholder="Digite aqui sua senha"
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirme sua senha"
        onChangeText={setPasswordConfirmation}
      />
      <Button text="Cadastrar" onPress={onSubmit} />
      <Button variant="tertiary" text="Já tenho conta" onPress={onSignIn} />
    </>
  );
};
