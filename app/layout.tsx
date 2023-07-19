import './globals.css';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/sidebar';
import SupabaseProvider from '@/providers/supabaseProvider';
import UserProvider from '@/providers/userProvider';
import ModalProvider from '@/providers/modalProvider';
import ToasterProvider from '@/providers/toasterProvider';
import getSongsByUserId from '@/actions/getSongsByUserId';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Music App',
  description: 'Listen to the music!',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
