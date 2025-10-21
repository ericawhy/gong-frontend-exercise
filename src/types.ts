export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  photo?: string | null;
  managerId?: number | null;
}

export type UsersById = Record<number, User>;

export type TreeNodeType = User & {
  children: TreeNodeType[];
  isManager: boolean;
};
