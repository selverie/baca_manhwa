import { useState } from 'react';

interface DisclosureType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle?: () => void;
}

export function useDisclosure(): DisclosureType {
  const [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
  }

  function onClose() {
    setIsOpen(false);
  }

  function toggle() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    onOpen,
    onClose,
    toggle,
  };
}
