import { APIResponse } from "..";
import { BookingStatus, USER_ROLE, UserStatus } from "../../enum";

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
  users: ManagedUser[];
}
