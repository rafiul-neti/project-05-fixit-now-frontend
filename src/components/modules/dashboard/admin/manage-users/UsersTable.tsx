"use client";

import { Spinner } from "@/components/ui/spinner";
import { USER_ROLE, UserStatus } from "@/lib/types/enum";
import { ManagedUser } from "@/lib/types/modules/admin/admin.types";
import { useState } from "react";

interface UsersTableProps {
  initialUsers: ManagedUser[];
}

const ROLE_LABEL: Record<USER_ROLE, string> = {
  CUSTOMER: "Customer",
  TECHNICIAN: "Technician",
  ADMIN: "Admin",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status: UserStatus }) {
  const isActive = status === UserStatus.UNBAN;
  return (
    <span
      className={`fixit-badge ${
        isActive
          ? "bg-(--success-light) text-(--success)"
          : "bg-(--error-light) text-(--error)"
      }`}
    >
      {isActive ? "Active" : "Suspended"}
    </span>
  );
}

function RoleBadge({ role }: { role: USER_ROLE }) {
  return (
    <span className="fixit-badge bg-(--info-light) text-(--info)">
      {ROLE_LABEL[role]}
    </span>
  );
}

export default function UsersTable({ initialUsers }: UsersTableProps) {
  const [users, setUsers] = useState<ManagedUser[]>(initialUsers);
  const [pendingUserId, setPendingUserId] = useState<string | null>(null);
  const [errorByUserId, setErrorByUserId] = useState<Record<string, string>>(
    {},
  );

  async function handleToggleStatus(user: ManagedUser) {
    const nextStatus: UserStatus =
      user.status === UserStatus.UNBAN ? UserStatus.BAN : UserStatus.UNBAN;

    setPendingUserId(user.id);
    setErrorByUserId((prev) => {
      const { [user.id]: _drop, ...rest } = prev;
      return rest;
    });

    try {
      //   const result = await updateUserStatus(user.id, nextStatus);
      // Only update local state after the mutation actually resolves —
      // a failed request must not appear to succeed.
      //   setUsers((prev) =>
      //     prev.map((u) =>
      //       u.id === user.id ? { ...u, status: result.status } : u,
      //     ),
      //   );
    } catch {
      setErrorByUserId((prev) => ({
        ...prev,
        [user.id]: "Couldn't update this user. Try again.",
      }));
    } finally {
      setPendingUserId(null);
    }
  }

  return (
    <>
      {/* Desktop / tablet: real table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border text-sm text-muted-foreground">
              <th className="py-3 pr-4 font-medium">Name</th>
              <th className="py-3 pr-4 font-medium">Email</th>
              <th className="py-3 pr-4 font-medium">Role</th>
              <th className="py-3 pr-4 font-medium">Status</th>
              <th className="py-3 pr-4 font-medium">Joined</th>
              <th className="py-3 pr-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border last:border-0"
              >
                <td className="py-3 pr-4 font-medium">{user.name}</td>
                <td className="py-3 pr-4 text-sm text-muted-foreground">
                  {user.email}
                </td>
                <td className="py-3 pr-4">
                  <RoleBadge role={user.role} />
                </td>
                <td className="py-3 pr-4">
                  <StatusBadge status={user.status} />
                </td>
                <td className="py-3 pr-4 text-sm text-muted-foreground">
                  {formatDate(user.createdAt)}
                </td>
                <td className="py-3 pr-4 text-right">
                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(user)}
                      disabled={pendingUserId === user.id}
                      aria-label={
                        user.status === UserStatus.UNBAN
                          ? `Suspend ${user.name}`
                          : `Activate ${user.name}`
                      }
                      className={
                        user.status === UserStatus.UNBAN
                          ? "btn-secondary border-(--error) text-(--error) hover:bg-(--error-light)"
                          : "btn-secondary border-(--success) text-(--success) hover:bg-(--success-light)"
                      }
                    >
                      {pendingUserId === user.id
                        ? <Spinner />
                        : user.status === UserStatus.UNBAN
                          ? UserStatus.BAN
                          : UserStatus.UNBAN}
                    </button>
                    {errorByUserId[user.id] && (
                      <span className="text-xs text-(--error)">
                        {errorByUserId[user.id]}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: stacked cards, same data as the table above */}
      <div className="flex flex-col gap-3 sm:hidden">
        {users.map((user) => (
          <div key={user.id} className="fixit-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <StatusBadge status={user.status} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <RoleBadge role={user.role} />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>

            <div className="mt-4 flex flex-col items-start gap-1">
              <button
                type="button"
                onClick={() => handleToggleStatus(user)}
                disabled={pendingUserId === user.id}
                aria-label={
                  user.status === "UNBAN"
                    ? `Suspend ${user.name}`
                    : `Activate ${user.name}`
                }
                className={
                  user.status === "UNBAN"
                    ? "btn-secondary w-full border-(--error) text-(--error) hover:bg-(--error-light)"
                    : "btn-secondary w-full border-(--success) text-(--success) hover:bg-(--success-light)"
                }
              >
                {pendingUserId === user.id
                  ? <Spinner />
                  : user.status === "UNBAN"
                    ? "Suspend"
                    : "Activate"}
              </button>
              {errorByUserId[user.id] && (
                <span className="text-xs text-(--error)">
                  {errorByUserId[user.id]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
