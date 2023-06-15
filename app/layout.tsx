import './globals.css';
import { Figtree } from 'next/font/google';
import Sidebar from '@/components/sidebar';

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
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
