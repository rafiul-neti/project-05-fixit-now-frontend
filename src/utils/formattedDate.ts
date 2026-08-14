export const formattedDate = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};
