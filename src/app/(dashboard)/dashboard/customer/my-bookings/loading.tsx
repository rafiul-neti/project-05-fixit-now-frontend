import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ROW_COUNT = 5;

export default function Loading() {
  return (
    <section className="p-5">
      <Skeleton className="h-8 w-40" />

      <div className="mt-4">
        <Table>
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
            {Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="mx-auto h-7 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
