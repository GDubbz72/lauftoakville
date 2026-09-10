import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LAUFT Muskoka — Your New Commute Starts Here',
  description:
    'Pre-register for LAUFT Muskoka, the new flexible workspace location. Skip the commute, enjoy flexible pricing, and access a rich area. Founding member benefits available now.',
  keywords: ['flexible workspace', 'coworking', 'Muskoka', 'LAUFT', 'office rental'],
  authors: [{ name: 'LAUFT' }],
  openGraph: {
    title: 'LAUFT Muskoka — Your New Commute Starts Here',
    description: 'Pre-register for LAUFT Muskoka and claim founding-member pricing.',
    type: 'website',
    url: 'https://muskoka.lauft.work',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAUFT Muskoka',
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
      <body className="min-h-full flex flex-col bg-white text-[var(--fg)] overflow-x-hidden">{children}</body>
    </html>
  );
}
