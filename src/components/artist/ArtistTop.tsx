import { Artist } from "@/types/spotify";
import Image from "next/image";

const ArtistTop = ({ artist }: { artist: Artist }) => {
    return (
        <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col items-center w-full gap-6 md:flex-row">
                    <div className="w-60 h-60 overflow-hidden border border-gray-200 rounded-md dark:border-gray-800">
                        <Image
                            width={640}
                            height={640}
                            src={
                                artist.images[0]?.url ||
                                "/images/artist/no-image.svg"
                            }
                            alt="artist"
                        />
                    </div>
                    <div>
                        <h4 className="mb-2 text-3xl font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                            {artist.name}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtistTop;
