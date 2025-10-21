import { useState } from "react";
import type { User } from "../types";

export default function UserBadge({ user }: { user: User }) {
  const [imageError, setImageError] = useState(false);

  const initials = `${user.firstName?.[0] ?? ""}${
    user.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <div className="flex items-center gap-3 border border-gray-200 p-3 rounded bg-white shadow">
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-purple-500 bg-white">
        {user.photo && !imageError ? (
          <img
            src={user.photo}
            alt={`${user.firstName} ${user.lastName}`}
            className="h-8 w-8 rounded-full object-cover border bg-purple-400"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-xs font-semibold">{initials}</span>
        )}
      </div>
      <div className="leading-tight">
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-xs text-gray-600">{user.email}</div>
      </div>
    </div>
  );
}
