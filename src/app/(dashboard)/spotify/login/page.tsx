import Alert from "@/components/ui/alert/Alert";
import Button from "@/components/ui/button/Button";
import { redirectToSpotify } from "@/lib/spotify/actions";
import { refreshTokenExists } from "@/lib/spotify/api";

const Page = async () => {
  const isLogin = await refreshTokenExists();

  return (
    <>
      {isLogin ? (
        <Alert variant="success" title="You are logged in to Spotify.">
          <Button
            size="sm"
            variant="primary"
            className="mt-4"
            onClick={redirectToSpotify}
          >
            Change Spotify Account
          </Button>
        </Alert>
      ) : (
        <Alert variant="warning" title="You are not logged in to Spotify.">
          <Button
            size="sm"
            variant="primary"
            className="mt-4"
            onClick={redirectToSpotify}
          >
            Login to Spotify
          </Button>
        </Alert>
      )}
    </>
  );
};

export default Page;
