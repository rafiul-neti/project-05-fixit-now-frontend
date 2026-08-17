import { getMe } from "@/service/getMe";

type TechnicianFunction<T> = (technicianId: string) => Promise<T>;

export const callApiThroughTechnicianId = async <T>(
  fn: TechnicianFunction<T>,
): Promise<T> => {
  const user = await getMe();

  const data = await fn(user.data.technician.id);

  return data;
};
