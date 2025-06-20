import LoginButton from "@/components/login/LoginButton";
import Alert from "@/components/ui/alert/Alert";
import { refreshTokenExists } from "@/lib/spotify/api";

const Page = async () => {
  const isLogin = await refreshTokenExists();

  return (
    <>
      {isLogin ? (
        <Alert variant="success" title="You are logged in to Spotify.">
          <LoginButton>Change Spotify Account</LoginButton>
        </Alert>
      ) : (
        <Alert variant="warning" title="You are not logged in to Spotify.">
          <LoginButton>Login to Spotify</LoginButton>
        </Alert>
      )}
    </>
  );
};

export default Page;
