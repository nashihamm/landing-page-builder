// app/editor/[pageId]/layout.tsx
'use client';

import { EditorProvider } from '@/app/contexts/EditorContext';

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EditorProvider>{children}</EditorProvider>;
}