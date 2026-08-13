import { BookingStatus } from "../../enum";

export type Booking = {
  id: string;
  userId: string;
  serviceId: string;
  technicianId: string;
  addressId: string;
  startedAt?: string;
  completedAt?: string;
  workedMinutes?: string;
  totalPrice?: number;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  service: { name: string };
  technician: { user: { name: string } };
  address: { city: string; region: string };
};
