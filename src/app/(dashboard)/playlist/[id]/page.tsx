import PlaylistTop from "@/components/playlist/PlaylistTop";
import TrackTable from "@/components/tables/TrackTable";
import { getPlaylist } from "@/lib/spotify/api";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const playlist = await getPlaylist(params.id);
  const tracks = playlist.tracks.items
    .map((item) => item.track)
    .filter((track) => "album" in track);

  return (
    <>
      <PlaylistTop playlist={playlist} />

      <div className="mt-5">
        <TrackTable tracks={tracks} showImage={true} />
      </div>
    </>
  );
};

export default Page;
