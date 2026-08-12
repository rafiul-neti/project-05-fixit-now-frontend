export enum USER_ROLE {
  Customer = "CUSTOMER",
  Technician = "TECHNICIAN",
  Admin = "ADMIN",
}

export const UserStatus = {
  BAN: "BAN",
  UNBAN: "UNBAN",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const BookingStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINED",
  PAID: "PAID",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;

export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export const WeekendDays = {
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
} as const;

export type WeekendDays = (typeof WeekendDays)[keyof typeof WeekendDays];

export const PaymentStatus = {
  PENDING: "PENDING",
  SUCCEEDED: "SUCCEEDED",
  FAILED: "FAILED",
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const WhereAbout = {
  HOME: "HOME",
  OFFICE: "OFFICE",
} as const;

export type WhereAbout = (typeof WhereAbout)[keyof typeof WhereAbout];

export const PaymentProvider = {
  STRIPE: "STRIPE",
  SSLCOMMERZ: "SSLCOMMERZ",
} as const;

export type PaymentProvider =
  (typeof PaymentProvider)[keyof typeof PaymentProvider];
