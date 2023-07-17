'use client';

import { useEffect, useState } from 'react';

import AuthModal from '@/components/modals/authModal';
import UploadModal from '@/components/modals/uploadModal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
