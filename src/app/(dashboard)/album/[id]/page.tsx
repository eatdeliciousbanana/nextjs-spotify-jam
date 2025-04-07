import AlbumTop from "@/components/album/AlbumTop";
import TrackTable from "@/components/tables/TrackTable";
import { getAlbum } from "@/lib/spotify/api";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const album = await getAlbum(params.id);

  return (
    <>
      <AlbumTop album={album} />

      <div className="mt-5">
        <TrackTable tracks={album.tracks.items} />
      </div>
    </>
  );
};

export default Page;
