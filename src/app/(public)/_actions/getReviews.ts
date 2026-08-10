export const getReviews = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews?limit=5`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 12,
      tags: ["reviews"],
    },
  });

  const result = await res.json();

  return result.data;
};
