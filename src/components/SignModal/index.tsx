import { router, usePathname } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import Observable, { useObservable } from "../../Observable";
import { auth } from "../../firebase";
import Modal from "../Modal";

const isSignModalOpen = new Observable<string>(undefined);

export default function SignModal() {
  const { isSignModalOpen, closeSignModal } = useSignModal();

  const [step, setStep] = useState<"SIGN-IN" | "SIGN-UP">("SIGN-UP");

  if (!isSignModalOpen) return null;

  const isSignUp = step === "SIGN-UP";

  return (
    <Modal open={!!isSignModalOpen} onClose={closeSignModal}>
      {isSignUp ? (
        <SignUp onSignIn={() => setStep("SIGN-IN")} />
      ) : (
        <SignIn onSignUp={() => setStep("SIGN-UP")} />
      )}
    </Modal>
  );
}

export function useSignModal() {
  const [user] = useAuthState(auth);
  const pathname = usePathname();

  const [isOpen, setOpen] = useObservable(isSignModalOpen);

  const openSignModal = useCallback(() => setOpen(pathname), []);
  const closeSignModal = useCallback(() => setOpen(undefined), []);

  useEffect(() => {
    if (user && isOpen) {
      closeSignModal();
      router.push(isOpen);
    }
  }, [user, isOpen]);

  return {
    isSignModalOpen: !!isOpen,
    openSignModal,
    closeSignModal,
    origin: isOpen,
  };
}
