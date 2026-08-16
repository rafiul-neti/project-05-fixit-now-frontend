import { BookingStatus, PaymentStatus, WeekendDays } from "../../enum";

export interface TechnicianBookingPayment {
  status: PaymentStatus;
}

export interface TechnicianBookingReview {
  givenStars: number;
  content: string | null;
}

export interface TechnicianBooking {
  id: string;
  startedAt: string | null;
  completedAt: string | null;
  workedMinutes: number | null;
  totalPrice: string | null;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  payment: TechnicianBookingPayment | null;
  review: TechnicianBookingReview | null;
  service: { name: string };
}

export interface TechnicianAvailability {
  startTime: string;
  endTime: string;
  weekendDays: WeekendDays;
}

export interface TechnicianDashboardData {
  id: string;
  profilePhoto: string | null;
  bio: string;
  experienceYears: number;
  hourlyRate: number;
  serviceAreas: string[];
  createdAt: string;
  updatedAt: string;
  availability: TechnicianAvailability;
  bookings: TechnicianBooking[];
  _count: {
    reviews: number;
    technicianServices: number;
    bookings: number;
  };
  user: { name: string };
  averagerating: number;
}

export interface TechnicianDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianDashboardData;
}
