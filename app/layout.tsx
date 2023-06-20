import './globals.css';
import { Figtree } from 'next/font/google';

import Sidebar from '@/components/sidebar';
import SupabaseProvider from '@/providers/supabaseProvider';
import UserProvider from '@/providers/userProvider';
import ModalProvider from '@/providers/modalProvider';
import ToasterProvider from '@/providers/toasterProvider';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Music App',
  description: 'Listen to music!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
