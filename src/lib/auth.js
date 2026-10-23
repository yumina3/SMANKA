"use client";

import { supabaseBrowser } from "@/lib/supabase/client";

export async function masuk(email, password) {
  const { data, error } = await supabaseBrowser().auth.signInWithPassword({
    email,
    password,
  });
  if (error) return { ok: false, pesan: error.message };
  return { ok: true, user: data.user };
}

export async function keluar() {
  await supabaseBrowser().auth.signOut();
}

export async function sesiSekarang() {
  const { data } = await supabaseBrowser().auth.getSession();
  return data.session?.user ?? null;
}
