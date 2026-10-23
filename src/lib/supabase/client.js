import { createBrowserClient } from "@supabase/ssr";

export function buatKlienBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

let klien = null;

export function supabaseBrowser() {
  if (!klien) klien = buatKlienBrowser();
  return klien;
}
