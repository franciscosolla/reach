import { useCallback, useState } from "react";

import Observable, { useObservable } from "../../Observable";
import Modal from "../Modal";
import Text from "../Text";

const isSignModalOpen = new Observable(false);

export default function SignModal() {
  const { isSignModalOpen, closeSignModal } = useSignModal();

  const [step, setStep] = useState<"ID">("ID");

  if (!isSignModalOpen) return null;

  switch (step) {
    default:
      return (
        <Modal open={isSignModalOpen} onClose={closeSignModal}>
          <Text>Sign in</Text>
        </Modal>
      );
  }
}

export function useSignModal() {
  const [isOpen, setOpen] = useObservable(isSignModalOpen);

  const openSignModal = useCallback(() => setOpen(true), []);
  const closeSignModal = useCallback(() => setOpen(false), []);

  return {
    isSignModalOpen: isOpen,
    openSignModal,
    closeSignModal,
  };
}
