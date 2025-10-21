import { Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl">Hierarchy Tree</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <nav className="mx-auto flex max-w-6xl items-center justify-between">
              <button
                onClick={logout}
                className="bg-[#493b9b] hover:opacity-90 text-white py-1 px-2 rounded-2xl text-sm"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
