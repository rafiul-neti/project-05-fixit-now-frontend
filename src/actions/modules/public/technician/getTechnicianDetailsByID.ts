export async function getTechnicianDetailsByID(technicianId: string) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/technicians/${technicianId}`,
  );

  const result = await res.json();

  return result.data;
}
