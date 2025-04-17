import { Artist } from "@/types/spotify";
import Image from "next/image";
import Link from "next/link";

const ArtistImage = ({ artist }: { artist: Artist }) => {
  return (
    <Link href={`/artist/${artist.id}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-full bg-gray-100 rounded-xl dark:bg-gray-800">
          <Image
            width={640}
            height={640}
            src={artist.images[0]?.url || "/images/artist/no-image.svg"}
            alt="artist"
            className="rounded-md"
          />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <h4 className="mt-2 font-bold text-gray-800 text-xl dark:text-white/90">
              {artist.name}
            </h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtistImage;
