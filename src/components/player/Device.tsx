"use client";

import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import {
  ComputerIcon,
  DeviceIcon,
  PauseIcon,
  PlayIcon,
  SkipNextIcon,
  SkipPreviousIcon,
  SmartphoneIcon,
  VolumeIcon,
} from "@/icons";
import {
  pausePlayback,
  setPlaybackVolume,
  skipToNext,
  skipToPrevious,
  startPlayback,
} from "@/lib/spotify/actions";
import { Device as DeviceType } from "@/types/spotify";

const Device = ({ device }: { device: DeviceType }) => {
  const handleVolumeChange = (
    e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>
  ) => {
    setPlaybackVolume(parseInt(e.currentTarget.value));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-center w-full bg-gray-100 rounded-xl dark:bg-gray-800">
        {device.type.toLowerCase() === "computer" ? (
          <ComputerIcon className="w-full h-full fill-gray-500 dark:fill-gray-400" />
        ) : device.type.toLowerCase() === "smartphone" ? (
          <SmartphoneIcon className="w-full h-full fill-gray-500 dark:fill-gray-400" />
        ) : (
          <DeviceIcon className="w-full h-full fill-gray-500 dark:fill-gray-400" />
        )}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <h4 className="mt-2 font-bold text-gray-800 text-xl dark:text-white/90">
            {device.name}
          </h4>
        </div>
      </div>

      {device.is_active &&
      !device.is_private_session &&
      !device.is_restricted ? (
        <>
          <div className="mt-5">
            <div className="w-full inline-flex items-center shadow-theme-xs">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-1/2 sm:px-6 rounded-none rounded-tl-lg ring-0! border-1 border-brand-500"
                onClick={() => startPlayback()}
              >
                <PlayIcon className="fill-current" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-1/2 sm:px-6 rounded-none rounded-tr-lg ring-0! border-t-1 border-r-1 border-b-1 border-brand-500"
                onClick={() => pausePlayback()}
              >
                <PauseIcon className="fill-current" />
              </Button>
            </div>
            <div className="w-full inline-flex items-center shadow-theme-xs">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-1/2 sm:px-6 rounded-none rounded-bl-lg ring-0! border-l-1 border-r-1 border-b-1 border-brand-500"
                onClick={() => skipToPrevious()}
              >
                <SkipPreviousIcon className="fill-current" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-1/2 sm:px-6 rounded-none rounded-br-lg ring-0! border-r-1 border-b-1 border-brand-500"
                onClick={() => skipToNext()}
              >
                <SkipNextIcon className="fill-current" />
              </Button>
            </div>
          </div>

          {device.supports_volume &&
            typeof device.volume_percent === "number" && (
              <div className="mt-4 flex items-center">
                <div>
                  <VolumeIcon className="fill-gray-500 dark:fill-gray-400" />
                </div>
                <div className="grow mx-3">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={device.volume_percent}
                    onMouseUp={handleVolumeChange}
                    onTouchEnd={handleVolumeChange}
                    className="appearance-auto! px-0!"
                  />
                </div>
              </div>
            )}
        </>
      ) : (
        <div className="mt-2">
          <span className="text-base text-gray-500 dark:text-gray-400">
            Device not active
          </span>
        </div>
      )}
    </div>
  );
};

export default Device;
