import Playback from "@/components/dashboard/Playback";
import TableSwitcher from "@/components/dashboard/TableSwitcher";
import { getDashboardData } from "@/lib/spotify/api";

const Page = async () => {
  const dashboardData = await getDashboardData();

  return (
    <>
      <Playback playback={dashboardData.playback} />

      <div className="mt-5">
        <TableSwitcher
          queue={dashboardData.queue}
          recent={dashboardData.recent}
        />
      </div>
    </>
  );
};

export default Page;
