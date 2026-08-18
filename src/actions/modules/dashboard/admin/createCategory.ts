"use server"

import { ICategory } from "@/lib/types/modules/admin/admin.types";


//  TODO: have to call the real API to create a category below

/*
 *   import { getAccessToken } from "@/lib/auth/getAccessToken";
 *
 *   export async function createCategory(name: string): Promise<Category> {
 *     const accessToken = await getAccessToken();
 *     const res = await fetch(`${process.env.BACKEND_URL}/api/admin/categories`, {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         Authorization: `Bearer ${accessToken}`,
 *       },
 *       body: JSON.stringify({ name }),
 *     });
 *     if (!res.ok) throw new Error("Failed to create category");
 *     return res.json() as Promise<Category>;
 *   }
 */

export async function createCategory(name: string): Promise<ICategory> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    services: [],
  };
}
