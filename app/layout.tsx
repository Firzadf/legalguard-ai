import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LegalGuard AI - SaaS Contract & Compliance Intelligence',
  description: 'Autonomous contract risk assessment agent powered by Langflow, Supabase pgvector, and Gemini.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
