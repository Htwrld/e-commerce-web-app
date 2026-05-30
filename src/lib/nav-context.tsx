"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type PageId =
  | "home" | "shop" | "collections" | "about"
  | "ambassadors" | "contact" | "checkout" | "policy";

interface NavContextValue {
  page: PageId;
  navTo: (id: PageId) => void;
  activeCat: string;
  setActiveCat: (cat: string) => void;
  activeGen: string;
  setActiveGen: (gen: string) => void;
}

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: { children: ReactNode }) {
  const [page,      setPage]      = useState<PageId>("home");
  const [activeCat, setActiveCat] = useState("All");
  const [activeGen, setActiveGen] = useState("All");

  const navTo = useCallback((id: PageId) => {
    setPage(id);
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, []);

  return (
    <NavContext.Provider value={{ page, navTo, activeCat, setActiveCat, activeGen, setActiveGen }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}
