export const formattedDate = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};

// technician's availability time format
export function formatTechnicianAvailabilityTime(time: string) {
  // "09:00" -> "9:00 AM"
  const [hourStr, minute] = time.split(":");
  const hour = Number(hourStr);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minute} ${period}`;
}
