import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ViewBookingButton from "./ViewBookingButton";
import { formattedDate } from "@/utils/formattedDate";
import { Booking } from "@/lib/types/modules/booking/booking.types";

const BookingTable = ({
  bookings,
  caption,
}: {
  bookings: Booking[];
  caption: string;
}) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
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
        {bookings.map((booking) => {
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
  );
};

export default BookingTable;
