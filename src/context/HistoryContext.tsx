'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HistoryContext = createContext<{ history: string[] }>({ history: [] });

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory((prev) => {
      // Prevent duplicate consecutive entries
      if (prev[prev.length - 1] === pathname) return prev;
      return [...prev, pathname];
    });
  }, [pathname]);

  return (
    <HistoryContext.Provider value={{ history }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => useContext(HistoryContext);
