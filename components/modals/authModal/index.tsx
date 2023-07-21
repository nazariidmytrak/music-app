'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import Modal from '@/components/modals/modal';
import { useAuthModal } from '@/hooks/useModal';
import { handleOpenChange } from '@/helpers/modalHelpers';

const AuthModal = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title='Welcome back'
      description='Login to your account'
      isOpen={isOpen}
      onChange={(open) => handleOpenChange(open, onClose)}
    >
      <Auth
        theme='dark'
        magicLink
        providers={['github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: { colors: { brand: '#404040', brandAccent: '#22c55e' } },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
