"use server";

export const getTechnicians = async () => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians?limit=8`,
    {
      cache: "no-cache",
      next: {
        revalidate: 60 * 60 * 12,
        tags: ["all-technicians"],
      },
    },
  );

  const result = await res.json();

  console.log(result);

  return result.data;
};