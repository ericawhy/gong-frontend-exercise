import { useState } from "react";
import type { TreeNodeType } from "../types";
import UserBadge from "./UserBadge";

export default function TreeNode({ node }: { node: TreeNodeType }) {
  const [open, setOpen] = useState(node.isManager);

  return (
    <div className="ml-4">
      <div className="flex items-start gap-4">
        <button
          onClick={() => node.isManager && setOpen((prev) => !prev)}
          aria-disabled={!node.isManager && node.children.length === 0}
          className={`mt-1 h-5 w-5 rounded border border-gray-400 text-xs  ${
            !node.isManager || node.children.length === 0
              ? "opacity-50 cursor-default"
              : "cursor-pointer hover:bg-gray-200"
          }`}
        >
          {node.isManager ? "+" : "−"}
        </button>
        <UserBadge user={node} />
      </div>

      {open && node.children.length > 0 && (
        <div className="ml-6 mt-4 space-y-4 border-l border-gray-300 pl-4">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
