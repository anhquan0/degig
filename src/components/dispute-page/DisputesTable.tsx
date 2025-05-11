import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dispute } from "@prisma/client";
import dayjs from "dayjs";
import { shortenString } from "@/utils/shorten-string";

export function SupportDisputesTable({ disputes }: { disputes: Dispute[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>ID</TableHead> */}
            <TableHead>TXHASH</TableHead>
            <TableHead>PartyA</TableHead>
            <TableHead>PartyB</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disputes.map((dispute) => (
            <TableRow key={dispute.id} onClick={() => window.open(`/dashboard/dispute/${dispute.id}`)}>
              {/* <TableCell>{dispute.id}</TableCell> */}
              <TableCell>{shortenString(dispute.txHash)}</TableCell>
              <TableCell>{shortenString(dispute.partyA)}</TableCell>
              <TableCell>{shortenString(dispute.partyB)}</TableCell>
              <TableCell>{dispute.reason}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {dispute.status === "OPEN" ? (
                    <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                  ) : dispute.status === "REVIEW" ? (
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  )}
                  <span
                    className={`${dispute.status === "OPEN" ? "text-red-600" : dispute.status === "REVIEW" ? "text-amber-600" : "text-green-600"}`}
                  >
                    {dispute.status}
                  </span>
                </div>
              </TableCell>
              <TableCell>{dayjs(dispute.createdAt).format("DD MMM hh:mm A")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
