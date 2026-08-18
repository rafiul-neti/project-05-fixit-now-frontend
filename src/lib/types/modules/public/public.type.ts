import { WeekendDays } from "../../enum";

export interface ITechnicianDetail {
  id: string;
  profilePhoto: string | null;
  bio: string;
  experienceYears: number;
  hourlyRate: number;
  serviceAreas: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: { reviews: number };
  availability: {
    weekendDays: WeekendDays;
    startTime: string;
    endTime: string;
  };
  user: { name: string };
  averageRating: number;
}
