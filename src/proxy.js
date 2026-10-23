import { NextResponse } from "next/server";
import { perbaruiSesi } from "@/lib/supabase/middleware";

export default async function proxy(request) {
  return perbaruiSesi(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
