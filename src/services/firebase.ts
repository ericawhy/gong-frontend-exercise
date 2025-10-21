import type { User } from "../types";

const ROOT = import.meta.env.VITE_FIREBASE_ROOT as string | undefined;

async function get<T>(path: string): Promise<T> {
  if (!ROOT) {
    throw new Error("VITE_FIREBASE_ROOT is not configured");
  }
  const res = await fetch(`${ROOT.replace(/\/$/, "")}/${path}.json`);
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`);
  return res.json();
}

export type SecretsMap = Record<string, number>;

export async function fetchSecrets(): Promise<SecretsMap> {
  return get<SecretsMap>("secrets");
}

export async function fetchUsers(): Promise<User[]> {
  return get<User[]>("users");
}

export async function fetchUserById(id: number): Promise<User | null> {
  const users = await fetchUsers();
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error(`User ${id} not found`);
  return user;
}
