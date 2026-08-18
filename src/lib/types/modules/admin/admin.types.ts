import { BookingStatus } from "../../enum";

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

export interface AdminDashboardResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminDashboardData;
}
