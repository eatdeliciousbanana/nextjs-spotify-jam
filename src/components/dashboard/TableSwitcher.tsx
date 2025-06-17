"use client";

import TrackTable from "@/components/tables/TrackTable";
import Button from "@/components/ui/button/Button";
import { Track } from "@/types/spotify";
import { useState } from "react";

const TableSwitcher = ({
  queue,
  recent,
}: {
  queue: Track[];
  recent: Track[];
}) => {
  const [table, setTable] = useState<"queue" | "recent">("queue");

  return (
    <>
      <div className="ml-1">
        <div className="inline-flex items-center shadow-theme-xs">
          <Button
            type="button"
            variant={table === "queue" ? "primary" : "outline"}
            className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
            onClick={() => setTable("queue")}
          >
            Queue
          </Button>
          <Button
            type="button"
            variant={table === "recent" ? "primary" : "outline"}
            className="sm:px-6 rounded-none first:rounded-l-lg last:rounded-r-lg"
            onClick={() => setTable("recent")}
          >
            Recently Played
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <TrackTable
          tracks={table === "queue" ? queue : recent}
          showImage={true}
        />
      </div>
    </>
  );
};

export default TableSwitcher;
