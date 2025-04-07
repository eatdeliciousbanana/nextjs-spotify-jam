import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SimplifiedTrack } from "@/types/spotify";
import { msToSec } from "@/lib/utils";
import Link from "next/link";

const TrackTable = ({ tracks }: { tracks: SimplifiedTrack[] }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="w-10 md:w-16 pl-5 md:pr-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
              >
                #
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
              >
                Title
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-end text-sm dark:text-gray-400"
              >
                Duration
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tracks.map((track, key) => (
              <TableRow key={key}>
                <TableCell className="pl-5 md:pr-5 py-4 text-gray-800 dark:text-white/90">
                  {track.track_number}
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div>
                    <span className="block font-medium text-gray-800 text-base dark:text-white/90">
                      {track.name}
                    </span>
                    <span className="block text-gray-500 text-sm dark:text-gray-400">
                      {track.artists.map((artist, key) => (
                        <span key={key}>
                          {key > 0 && ", "}
                          <Link
                            href={`/artist/${artist.id}`}
                            className="hover:underline"
                          >
                            {artist.name}
                          </Link>
                        </span>
                      ))}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-end text-sm dark:text-gray-400">
                  {msToSec(track.duration_ms)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TrackTable;
