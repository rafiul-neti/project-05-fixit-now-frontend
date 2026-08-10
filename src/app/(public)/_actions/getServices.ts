"use server";

export const getServices = async () => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/services?limit=10`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 12,
        tags: ["all-services"],
      },
    },
  );

  const result = await res.json();

  return result.data;
};
