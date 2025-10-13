'use client'
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children }) {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    // 클라이언트 환경에서만 실행됨
    setMounted(true);
    setPortalRoot(document.body);
  }, []);

  if (!mounted || !portalRoot) return null;
  return createPortal(children, portalRoot);
}
