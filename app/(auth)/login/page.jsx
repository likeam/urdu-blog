"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("غلط صارف نام یا پاس ورڈ");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6f0]">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold text-[#2c1810] mb-6 text-center">
          منتظم لاگ ان
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-[#5a4a3a] font-medium mb-1">
              صارف نام
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[#5a4a3a] font-medium mb-1">
              پاس ورڈ
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <button type="submit" className="admin-btn w-full">
            لاگ ان کریں
          </button>
        </form>
      </div>
    </div>
  );
}
