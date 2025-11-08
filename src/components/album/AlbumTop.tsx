import { capitalize, getYear } from "@/lib/utils";
import { Album } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

const AlbumTop = ({ album }: { album: Album }) => {
  return (
    <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 md:flex-row">
          <div className="w-60 overflow-hidden border border-gray-200 rounded-md dark:border-gray-800">
            <Image
              width={640}
              height={640}
              src={album.images[0].url}
              alt="album"
            />
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {capitalize(album.album_type)}
            </span>
            <h4 className="text-3xl font-semibold text-gray-800 dark:text-white/90">
              {album.name}
            </h4>
            <span className="text-base">
              <span className="text-gray-800 dark:text-white/90">
                {album.artists.map((artist, index) => (
                  <span key={artist.id}>
                    {index > 0 && ", "}
                    <Link
                      href={`/artist/${artist.id}`}
                      className="hover:underline"
                      prefetch={false}
                    >
                      {artist.name}
                    </Link>
                  </span>
                ))}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {` • ${getYear(album.release_date)} • ${
                  album.total_tracks
                } tracks`}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumTop;
