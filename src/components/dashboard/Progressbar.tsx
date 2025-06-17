"use client";

import { msToSec } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Progressbar = ({
  startAt,
  durationMs,
}: {
  startAt: number;
  durationMs: number;
}) => {
  const router = useRouter();
  const [progressMs, setProgressMs] = useState(0);

  useEffect(() => {
    setProgressMs(Date.now() - startAt);

    const interval = setInterval(() => {
      setProgressMs((prev) => {
        if (prev >= durationMs) {
          clearInterval(interval);
          setTimeout(() => router.refresh(), 1000);
          return durationMs;
        }
        return Date.now() - startAt;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startAt, durationMs]);

  return (
    <div className="flex items-center">
      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-400">
        {msToSec(progressMs)}
      </span>
      <div className="relative w-40 bg-gray-200 rounded-full dark:bg-gray-800 h-2">
        <div
          className="absolute left-0 h-full bg-brand-500 rounded-full"
          style={{ width: Math.floor((100 * progressMs) / durationMs) + "%" }}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-400">
        {msToSec(durationMs)}
      </span>
    </div>
  );
};

export default Progressbar;
