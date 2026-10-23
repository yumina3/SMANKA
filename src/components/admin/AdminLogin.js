"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock, User, LogIn } from "lucide-react";
import { masuk } from "@/lib/auth";

export default function AdminLogin({ onMasuk }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesanSalah, setPesanSalah] = useState("");
  const [memproses, setMemproses] = useState(false);

  const kirim = async (e) => {
    e.preventDefault();
    setMemproses(true);
    const hasil = await masuk(email, password);
    setMemproses(false);
    if (hasil.ok) {
      onMasuk();
    } else {
      setPesanSalah(hasil.pesan);
    }
  };

  const input =
    "w-full rounded-lg border border-[#CFE5F7] bg-white py-2.5 pl-10 pr-3 text-sm text-[#172238] placeholder:text-[#778296] focus:border-[#2C98ED] focus:outline-none focus:ring-2 focus:ring-[#2C98ED]/30";

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#F5F7FB] px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image
            src="/logo.png"
            alt="Logo SMA Negeri 1 Kajen"
            width={128}
            height={128}
            priority
            className="h-32 w-32 object-contain drop-shadow-md"
          />
          <p className="mt-4 text-sm text-[#778296]">
            Masuk untuk mengelola data sekolah.
          </p>
        </div>

        <form
          onSubmit={kirim}
          className="rounded-[14px] border border-[#CFE5F7] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(23,105,170,0.25)]"
        >
          <label htmlFor="login-user" className="text-xs font-semibold text-[#778296]">
            Email
          </label>
          <div className="relative mt-1.5">
            <User
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778296]"
            />
            <input
              id="login-user"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setPesanSalah("");
              }}
              autoComplete="username"
              required
              placeholder="nama@sekolah.sch.id"
              className={input}
            />
          </div>

          <label
            htmlFor="login-sandi"
            className="mt-4 block text-xs font-semibold text-[#778296]"
          >
            Password
          </label>
          <div className="relative mt-1.5">
            <Lock
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#778296]"
            />
            <input
              id="login-sandi"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPesanSalah("");
              }}
              autoComplete="current-password"
              required
              placeholder="••••••••"
              className={input}
            />
          </div>

          {pesanSalah && (
            <p role="alert" className="mt-3 text-xs font-semibold text-[#D93A3A]">
              Gagal masuk: {pesanSalah}
            </p>
          )}

          <button
            type="submit"
            disabled={memproses}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2C98ED] text-sm font-semibold text-white transition-colors hover:bg-[#1769AA] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1769AA]"
          >
            <LogIn size={16} aria-hidden="true" />
            {memproses ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
