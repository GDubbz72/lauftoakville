import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LAUFT Oakville — Your New Commute Starts Here',
  description:
    'Pre-register for LAUFT Oakville, the new flexible workspace location. Skip the commute, enjoy flexible pricing, and access a rich area. Founding member benefits available now.',
  keywords: ['flexible workspace', 'coworking', 'Oakville', 'LAUFT', 'office rental'],
  authors: [{ name: 'LAUFT' }],
  openGraph: {
    title: 'LAUFT Oakville — Your New Commute Starts Here',
    description: 'Pre-register for LAUFT Oakville and claim founding-member pricing.',
    type: 'website',
    url: 'https://oakville.lauft.work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAUFT Oakville',
    description: 'Your new commute starts here',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col bg-white text-[var(--fg)]">{children}</body>
    </html>
  );
}
