'use client'

import './globals.css';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from 'react-query';

export const metadata: Metadata = {
  title: 'BizzyQuiz',
  description: ':)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Theme>
            {children}
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  )
}
