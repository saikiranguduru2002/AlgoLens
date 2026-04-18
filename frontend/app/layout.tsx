import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AlgoLens',
  description: 'Interactive algorithm visualizer for learning sorting, searching, and graph traversals.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
