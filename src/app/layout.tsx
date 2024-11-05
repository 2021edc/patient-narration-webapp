import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import ControlBar from '@/components/controlbar/ControlBar';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Patient Narration Assistant',
  description: 'Patient Narration Assistant by CognifAI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-black bg-white dark:bg-gray-900 dark:text-white`}
      >
        <ControlBar></ControlBar>
        <main className="">{children}</main>
        <Toaster
          toastOptions={{
            duration: 1500,
            classNames: {
              error: 'text-red-400  bg-gray-100',
              success: 'text-green-400 bg-gray-100',
              warning: 'text-yellow-400',
              info: 'bg-blue-400',
            },
          }}
        ></Toaster>
      </body>
    </html>
  );
}
