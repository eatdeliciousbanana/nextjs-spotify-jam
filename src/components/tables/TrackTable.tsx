"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SimplifiedTrack, Track } from "@/types/spotify";
import { msToSec } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

const TrackTable = ({
  tracks,
  showImage = false,
}: {
  tracks: SimplifiedTrack[] | Track[];
  showImage?: boolean;
}) => {
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    track: SimplifiedTrack | Track | null;
  }>({
    isOpen: false,
    track: null,
  });

  const closeModal = () => {
    setModalData({ isOpen: false, track: null });
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="w-10 md:w-16 pl-5 md:pr-2 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  #
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                >
                  Title
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-end text-sm dark:text-gray-400"
                >
                  Duration
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tracks.map((track, key) => (
                <TableRow
                  key={key}
                  onClick={() => setModalData({ isOpen: true, track })}
                  className="hover:bg-gray-100 dark:hover:bg-white/[0.05]"
                >
                  <TableCell className="pl-5 md:pr-2 py-3">
                    {showImage && "album" in track ? (
                      <div className="w-13">
                        <Image
                          width={64}
                          height={64}
                          src={track.album.images[2].url}
                          alt="album"
                          className="rounded-xs"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-800 dark:text-white/90">
                        {track.track_number}
                      </span>
                    )}
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
                              onClick={(e) => e.stopPropagation()}
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

      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        className="max-w-[600px] p-5 lg:p-10"
      >
        <span className="font-semibold text-gray-800 mb-7 text-xl dark:text-white/90">
          Request this track?
        </span>

        {modalData.track && (
          <>
            <div className="flex items-center mt-5">
              {showImage && "album" in modalData.track ? (
                <div>
                  <Image
                    width={64}
                    height={64}
                    src={modalData.track.album.images[2].url}
                    alt="album"
                    className="rounded-xs"
                  />
                </div>
              ) : (
                <div className="px-2">
                  <span className="text-gray-800 dark:text-white/90">
                    {modalData.track.track_number}
                  </span>
                </div>
              )}
              <div className="ml-4">
                <span className="block font-medium text-gray-800 text-base dark:text-white/90">
                  {modalData.track.name}
                </span>
                <span className="block text-gray-500 text-sm dark:text-gray-400">
                  {modalData.track.artists.map((artist, key) => (
                    <span key={key}>{(key > 0 ? ", " : "") + artist.name}</span>
                  ))}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end w-full gap-3 mt-4">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={closeModal}
              >
                Close
              </Button>
              <Button type="button" size="sm">
                Request
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default TrackTable;
