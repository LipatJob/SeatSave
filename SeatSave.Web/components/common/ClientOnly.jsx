import React from 'react';

export default function ClientOnly({ children }) {
  return <div> {typeof window !== 'undefined' && children}</div>;
}
