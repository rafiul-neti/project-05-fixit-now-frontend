export async function getTechniciansByService(serviceId: string) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/public/technicians-for-a-service/${serviceId}`,
  );

  const result = await res.json();

  return result.data
}
