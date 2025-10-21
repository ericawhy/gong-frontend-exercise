import { useEffect, useState } from "react";
import { fetchUsers } from "../services/firebase";
import type { User, TreeNodeType } from "../types";
import TreeNode from "../components/TreeNode";

function buildTree(users: User[]): TreeNodeType[] {
  const byManager: Record<number, User[]> = {};
  const roots: User[] = [];

  for (const user of users) {
    if (user.managerId == null) {
      roots.push(user);
    } else {
      (byManager[user.managerId] ??= []).push(user);
    }
  }

  const attach = (user: User): TreeNodeType => {
    const children = (byManager[user.id] ?? []).map(attach);
    return {
      ...user,
      children,
      isManager: children.length > 0 || user.managerId == null,
    };
  };

  return roots.map(attach);
}

export default function HierarchyPage() {
  const [loading, setLoading] = useState(true);
  const [tree, setTree] = useState<TreeNodeType[]>([]);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        const userArray = Object.values(users);
        const treeData = buildTree(userArray);
        setTree(treeData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;

  return (
    <section>
      <div className="space-y-5">
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </section>
  );
}
