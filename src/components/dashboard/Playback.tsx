import Progressbar from "@/components/dashboard/Progressbar";
import { MusicIcon } from "@/icons";
import { PlaybackState } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

const Playback = ({ playback }: { playback: PlaybackState }) => {
  return (
    <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 md:flex-row">
          {playback.is_playing && "album" in playback.item ? (
            <>
              <div className="w-60 overflow-hidden border border-gray-200 rounded-md dark:border-gray-800">
                <Image
                  width={640}
                  height={640}
                  src={playback.item.album.images[0].url}
                  alt="album"
                />
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-gray-800 dark:text-white/90">
                  {playback.item.name}
                </h4>
                <span className="text-base text-gray-800 dark:text-white/90">
                  {playback.item.artists.map((artist, key) => (
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
                <div className="mt-2">
                  <Progressbar
                    startAt={Date.now() - playback.progress_ms}
                    durationMs={playback.item.duration_ms}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-60 h-60 overflow-hidden flex justify-center items-center border border-gray-200 rounded-md dark:border-gray-800">
                <MusicIcon className="w-30 h-30 fill-gray-500 dark:fill-gray-400" />
              </div>
              <div>
                <h4 className="text-3xl font-semibold text-gray-800 dark:text-white/90">
                  No track is playing
                </h4>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playback;
