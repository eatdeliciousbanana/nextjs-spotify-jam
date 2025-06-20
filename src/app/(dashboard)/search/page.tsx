import AlbumImage from "@/components/album/AlbumImage";
import ArtistImage from "@/components/artist/ArtistImage";
import SearchForm from "@/components/search/SearchForm";
import TrackTable from "@/components/tables/TrackTable";
import { search } from "@/lib/spotify/api";

const Page = async (props: {
  searchParams: Promise<{ q: string; type: string }>;
}) => {
  const searchParams = await props.searchParams;
  searchParams.type ??= "artist";
  const result = await search(searchParams.q, searchParams.type);

  return (
    <>
      <SearchForm searchParams={searchParams} />

      {result.artists && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
          {result.artists.items.map((artist) => (
            <ArtistImage key={artist.id} artist={artist} />
          ))}
        </div>
      )}

      {result.albums && (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
          {result.albums.items.map((album) => (
            <AlbumImage key={album.id} album={album} showArtist={true} />
          ))}
        </div>
      )}

      {result.tracks && (
        <div className="mt-5">
          <TrackTable tracks={result.tracks.items} showImage={true} />
        </div>
      )}
    </>
  );
};

export default Page;
