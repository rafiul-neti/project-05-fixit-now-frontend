import { APIResponse } from "..";
import {
  BookingStatus,
  PaymentStatus,
  USER_ROLE,
  UserStatus,
} from "../../enum";

// home page
export interface AdminDashboardStats {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: string;
  averageRating: number;
}

export interface AdminRecentBooking {
  id: string;
  status: BookingStatus;
  createdAt: string;
  user: {
    name: string;
  };
  technician: {
    user: {
      name: string;
    };
  };
  service: {
    name: string;
  };
}

export interface AdminDashboardData {
  stats: AdminDashboardStats;
  recentBookings: AdminRecentBooking[];
}

export interface AdminDashboardResponse extends APIResponse {
  data: AdminDashboardData;
}


// manage user page
export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: USER_ROLE;
  status: UserStatus;
  createdAt: string;
}

export interface GetAllUsersResponse extends APIResponse {
  data: ManagedUser[];
}


// manage bookings page types
export type BookingStatusType =
  (typeof BookingStatus)[keyof typeof BookingStatus];

export interface BookingAddress {
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  postCode: string;
  region: string;
}

export interface BookingServiceCategory {
  name: string;
}

export interface BookingService {
  name: string;
  category: BookingServiceCategory;
  description: string;
}

export interface BookingTechnician {
  user: {
    name: string;
  };
}

export interface BookingCustomer {
  name: string;
  email: string;
  phone: string;
}

export type BookingPayment = PaymentStatus;

export interface IBooking {
  id: string;
  userId: string;
  serviceId: string;
  technicianId: string;
  addressId: string;
  startedAt: string | null;
  completedAt: string | null;
  workedMinutes: number | null;
  totalPrice: string;
  status: BookingStatusType;
  createdAt: string;
  updatedAt: string;
  address: BookingAddress;
  payment: BookingPayment;
  service: BookingService;
  technician: BookingTechnician;
  user: BookingCustomer;
}

// types for manage-categories page
export interface ICategoryService {
  id: string;
  name: string;
  description: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  services: ICategoryService[];
}


// update user status response
export interface IUpdateUserStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: USER_ROLE;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
  };
}