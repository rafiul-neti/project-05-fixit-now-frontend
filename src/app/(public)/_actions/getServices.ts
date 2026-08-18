"use server";

export const getServices = async (limit?: number) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services?limit=${limit ? limit : 10}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 12,
        tags: ["all-services"],
      },
    },
  );

  const result = await res.json();

  console.dir(result, { depth: null });

  return result.data;
};
