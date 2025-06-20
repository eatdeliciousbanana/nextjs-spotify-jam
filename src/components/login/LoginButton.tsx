"use client";

import Button from "@/components/ui/button/Button";
import { redirectToSpotify } from "@/lib/spotify/actions";
import { ReactNode } from "react";

const LoginButton = ({ children }: { children: ReactNode }) => {
  return (
    <Button
      type="button"
      size="sm"
      variant="primary"
      className="mt-4"
      onClick={() => redirectToSpotify()}
    >
      {children}
    </Button>
  );
};

export default LoginButton;
