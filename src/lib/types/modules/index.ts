import { BookingStatus } from "../enum";
import { BookingStatusType } from "./admin/admin.types";

export interface APIResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// admin manage bookings status transitions
export const ADMIN_ALLOWED_TRANSITIONS: Record<
  BookingStatusType,
  BookingStatusType[]
> = {
  [BookingStatus.REQUESTED]: [BookingStatus.ACCEPTED, BookingStatus.DECLINED],
  [BookingStatus.ACCEPTED]: [BookingStatus.IN_PROGRESS, BookingStatus.DECLINED],
  [BookingStatus.IN_PROGRESS]: [BookingStatus.COMPLETED],
  [BookingStatus.DECLINED]: [],
  [BookingStatus.COMPLETED]: [],
};

export const STATUS_LABEL: Record<BookingStatusType, string> = {
  [BookingStatus.REQUESTED]: "Requested",
  [BookingStatus.ACCEPTED]: "Accepted",
  [BookingStatus.IN_PROGRESS]: "In progress",
  [BookingStatus.COMPLETED]: "Completed",
  [BookingStatus.DECLINED]: "Declined",
};

export const STATUS_BADGE_CLASSES: Record<BookingStatusType, string> = {
  [BookingStatus.REQUESTED]: "bg-(--warning-light) text-(--warning)",
  [BookingStatus.ACCEPTED]: "bg-(--info-light) text-(--info)",
  [BookingStatus.IN_PROGRESS]: "bg-(--info-light) text-(--info)",
  [BookingStatus.COMPLETED]: "bg-(--success-light) text-(--success)",
  [BookingStatus.DECLINED]: "bg-(--error-light) text-(--error)",
};