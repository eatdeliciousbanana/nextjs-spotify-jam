import { Playlist } from "@/types/spotify";
import Image from "next/image";

const PlaylistTop = ({ playlist }: { playlist: Playlist }) => {
  return (
    <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 md:flex-row">
          <div className="w-60 overflow-hidden border border-gray-200 rounded-md dark:border-gray-800">
            <Image
              width={640}
              height={640}
              src={playlist.images[0].url}
              alt="playlist"
            />
          </div>
          <div>
            <h4 className="text-3xl font-semibold text-gray-800 dark:text-white/90">
              {playlist.name}
            </h4>
            <span className="text-base text-gray-500 dark:text-gray-400">
              {`${playlist.owner.display_name} • ${playlist.tracks.total} tracks`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistTop;
