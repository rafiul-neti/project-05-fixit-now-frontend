import { getAllUsers } from "@/actions/modules/dashboard/admin/getAllUsers";
import UsersTable from "@/components/modules/dashboard/admin/manage-users/UsersTable";

export default async function ManageUsersPage() {
  const result = await getAllUsers();

  if (!result.success || !result.data) {
    return (
      <div className="min-h-screen bg-(--background-secondary) py-10">
        <div className="fixit-container">
          <div className="fixit-card p-8 text-center text-sm text-secondary">
            {result.message ?? "Couldn't load the dashboard. Please try again."}
          </div>
        </div>
      </div>
    );
  }

  const { data: users } = result;

  return (
    <div className="fixit-container py-10 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Manage users</h1>
        <p className="text-muted-foreground mt-1">
          View every account on the platform and suspend or reactivate access as
          needed.
        </p>
      </div>

      <div className="fixit-card p-4 sm:p-6">
        {users.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No users yet.
          </div>
        ) : (
          <UsersTable initialUsers={users} />
        )}
      </div>
    </div>
  );
}
