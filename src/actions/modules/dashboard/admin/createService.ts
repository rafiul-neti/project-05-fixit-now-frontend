"use server"

import { ICategoryService } from "@/lib/types/modules/admin/admin.types";

export interface ICreateServiceInput {
  categoryId: string;
  name: string;
  description: string;
}

/**
 * TODO: have to call the real API to create a service under a category below
  shape, following the pattern used elsewhere in this project:
 
   import { getAccessToken } from "@/lib/auth/getAccessToken";
 
    export async function createService(
      input: CreateServiceInput
   ): Promise<CategoryService & { categoryId: string }> {
     const accessToken = await getAccessToken();
     const res = await fetch(
       `${process.env.BACKEND_URL}/api/admin/categories/${input.categoryId}/services`,
       {
        method: "POST",
         headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${accessToken}`,
        },
         body: JSON.stringify({ name: input.name, description: input.description }),
       }
     );
     if (!res.ok) throw new Error("Failed to create service");
     return res.json();
   }
*/

export async function createService(
  input: ICreateServiceInput,
): Promise<ICategoryService & { categoryId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    id: crypto.randomUUID(),
    name: input.name,
    description: input.description,
    categoryId: input.categoryId,
  };
}
