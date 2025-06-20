import AlbumImage from "@/components/album/AlbumImage";
import ArtistTop from "@/components/artist/ArtistTop";
import { getArtist, getArtistAlbums } from "@/lib/spotify/api";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const artist = await getArtist(params.id);
  const albums = await getArtistAlbums(params.id);

  return (
    <>
      <ArtistTop artist={artist} />

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
        {albums.map((album) => (
          <AlbumImage key={album.id} album={album} />
        ))}
      </div>
    </>
  );
};

export default Page;
