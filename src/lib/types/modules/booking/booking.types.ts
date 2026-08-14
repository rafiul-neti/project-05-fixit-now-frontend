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

export interface IBookingDetails {
  id: string;
  userId: string;
  serviceId: string;
  technicianId: string;
  addressId: string;
  startedAt: string | null;
  completedAt: string | null;
  workedMinutes: number | null;
  totalPrice: number | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  service: {
    name: string;
    category: { name: string };
  };
  technician: {
    user: { name: string };
    hourlyRate: number;
    experienceYears: number;
    availability: {
      startTime: string;
      endTime: string;
      weekendDays: string;
    };
  };
  address: {
    address_line_1: string;
    address_line_2: string | null;
    postCode: string;
    city: string;
    region: string;
    whereAbout: string;
  };
}
