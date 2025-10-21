import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

interface LoginError extends Error {
  message: string;
}

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      const loginError = err as LoginError;
      setError(loginError.message || "Login failed");
    }
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-2xl border bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold">Please login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <input
            className="w-full rounded-2xl border px-3 py-2 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Email Address"
          />
        </label>
        <label className="block">
          <input
            className="w-full rounded-2xl border px-3 py-2 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full rounded-2xl bg-[#493b9b] px-4 py-2 text-white hover:opacity-90">
          Login
        </button>
      </form>
    </div>
  );
}
