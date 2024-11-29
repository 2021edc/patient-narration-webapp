import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import ControlBar from '@/components/controlbar/ControlBar';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import PageBreadCrumbs from '@/atoms/PageBreadCrumbs';

const inter = Inter({ subsets: ['latin'] });
const appName = process.env.NEXT_PUBLIC_APP_NAME;

export const metadata: Metadata = {
  title: appName ? appName : 'Patient Narration Assistant',
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
        <PageBreadCrumbs></PageBreadCrumbs>
        <main className="">{children}</main>
        <Toaster
          toastOptions={{
            duration: 1500,
            classNames: {
              toast: 'text-lg',
              error: 'text-red-800 bg-white',
              success: 'text-gray-900 bg-white',
              warning: 'text-yellow-400 bg-white',
              info: 'text-blue-700 bg-white',
            },
          }}
        ></Toaster>
      </body>
    </html>
  );
}
