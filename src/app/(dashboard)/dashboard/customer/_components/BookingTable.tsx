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
import { BookingStatus, PaymentStatus } from "@/lib/types/enum";
import PayNowButton from "./_my-bookings/PayNowButton";

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
          <TableHead className="font-bold text-base">Status</TableHead>
          <TableHead className="text-center font-bold text-base">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => {
          return (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.service.name}
              </TableCell>
              <TableCell className="">{booking.technician.user.name}</TableCell>
              <TableCell className="">
                {formattedDate(booking.updatedAt)}
              </TableCell>
              <TableCell className="">{booking.status}</TableCell>
              <TableCell
                className={`text-center ${booking.status === BookingStatus.COMPLETED && booking.payment?.status !== PaymentStatus.PAID && "flex items-center gap-2"}`}
              >
                <ViewBookingButton boookingId={booking.id} />
                {booking.status === BookingStatus.COMPLETED &&
                  booking.payment?.status !== PaymentStatus.PAID && (
                    <PayNowButton
                      href={`/dashboard/customer/my-bookings/${booking.id}/pay`}
                      className="flex items-center text-white px-2 py-1 rounded"
                    />
                  )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BookingTable;
