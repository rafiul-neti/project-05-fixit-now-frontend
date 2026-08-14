import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustomerBookings } from "../../_actions/getCustomerBooking";
import { Booking } from "@/lib/types/modules/booking/booking.types";
import { formattedDate } from "@/utils/formattedDate";
import ViewBookingButton from "../ViewBookingButton";

const RecentBookings = async () => {
  const bookings: Booking[] = await getCustomerBookings({
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  return (
    <div className="">
      <h2 className="pb-4 text-2xl font-semibold tracking-tight">
        Recent Bookings
      </h2>

      <Table>
        <TableCaption>A list of your recent bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold text-base">
              Service
            </TableHead>
            <TableHead className="text-center font-bold text-base">
              Technician
            </TableHead>
            <TableHead className="text-center font-bold text-base">
              Date
            </TableHead>
            <TableHead className="text-center font-bold text-base">
              Status
            </TableHead>
            <TableHead className="text-center font-bold text-base">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.slice(0, 5).map((booking) => {
            return (
              <TableRow key={booking.id}>
                <TableCell className="text-center font-medium">
                  {booking.service.name}
                </TableCell>
                <TableCell className="text-center">
                  {booking.technician.user.name}
                </TableCell>
                <TableCell className="text-center">
                  {formattedDate(booking.updatedAt)}
                </TableCell>
                <TableCell className="text-center">{booking.status}</TableCell>
                <TableCell className="text-center">
                  <ViewBookingButton boookingId={booking.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentBookings;
