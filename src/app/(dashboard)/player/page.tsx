import Device from "@/components/player/Device";
import Alert from "@/components/ui/alert/Alert";
import { getAvailableDevices } from "@/lib/spotify/api";

const Page = async () => {
  const devices = await getAvailableDevices();

  return (
    <>
      {devices.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:grid-cols-5">
          {devices.map((device) => (
            <Device key={device.id} device={device} />
          ))}
        </div>
      ) : (
        <Alert variant="warning" title="No device detected." />
      )}
    </>
  );
};

export default Page;
