"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { keluar, sesiSekarang } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabase/client";
import AdminLogin from "@/components/admin/AdminLogin";

const KonteksSesi = createContext({
  masuk: false,
  memuat: false,
  user: null,
  masukSekarang: () => {},
  keluarSekarang: () => {},
});

export function PenyediaSesi({ children }) {
  const [masuk, setMasuk] = useState(false);
  const [memuat, setMemuat] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    sesiSekarang().then((u) => {
      setMasuk(Boolean(u));
      setUser(u);
      setMemuat(false);
    });

    const { data } = supabaseBrowser().auth.onAuthStateChange((_event, session) => {
      setMasuk(Boolean(session?.user));
      setUser(session?.user ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const keluarSekarang = async () => {
    await keluar();
    setMasuk(false);
    setUser(null);
  };

  return (
    <KonteksSesi.Provider
      value={{ masuk, memuat, user, masukSekarang: () => setMasuk(true), keluarSekarang }}
    >
      {children}
    </KonteksSesi.Provider>
  );
}

export const useSesi = () => useContext(KonteksSesi);

export default function AdminGuard({ children }) {
  const { masuk, memuat, masukSekarang } = useSesi();

  if (memuat) {
    return <div className="min-h-dvh bg-[#F5F7FB]" />;
  }

  if (!masuk) {
    return <AdminLogin onMasuk={masukSekarang} />;
  }

  return children;
}