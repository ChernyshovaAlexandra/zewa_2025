// shared/ui/ErrorPage.tsx
import React from 'react';

export const ErrorPage: React.FC<{ error: unknown }> = ({ error }) => (
  <div style={{ padding: 20 }}>
    <h1>Упс… что-то пошло не так</h1>
    <code>{String(error)}</code>
  </div>
);
