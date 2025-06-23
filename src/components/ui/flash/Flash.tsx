import {
  FlashCloseIcon,
  FlashErrorIcon,
  FlashInfoIcon,
  FlashSuccessIcon,
  FlashWarningIcon,
} from "@/icons";
import { useEffect, useState } from "react";

const Flash = () => {
  const variantClasses = {
    success: {
      container: "border-success-500",
      icon: "bg-success-50 text-success-500",
    },
    error: {
      container: "border-error-500",
      icon: "bg-error-50 text-error-500",
    },
    warning: {
      container: "border-warning-500",
      icon: "bg-warning-50 text-warning-500",
    },
    info: {
      container: "border-blue-light-500",
      icon: "bg-blue-light-50 text-blue-light-500",
    },
  };

  const icons = {
    success: <FlashSuccessIcon />,
    error: <FlashErrorIcon />,
    warning: <FlashWarningIcon />,
    info: <FlashInfoIcon />,
  };

  const [flash, setFlash] = useState<{
    type: "success" | "error" | "warning" | "info" | null;
    message: string | null;
  }>({ type: null, message: null });

  const cookieValue =
    typeof document !== "undefined" &&
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("flash="))
      ?.split("=")[1];

  useEffect(() => {
    if (cookieValue) {
      setFlash(JSON.parse(decodeURIComponent(cookieValue)));
    }
  }, [cookieValue]);

  const handleClick = () => {
    document.cookie = "flash=; max-age=0; path=/";
    setFlash({ type: null, message: null });
  };

  if (!flash.type || !flash.message) return null;

  return (
    <div
      className={`fixed sm:right-5 z-99999 flex items-center justify-between gap-3 w-11/12 sm:max-w-[340px] rounded-md border-b-4 p-3 shadow-theme-sm bg-white dark:bg-[#1E2634] ${
        variantClasses[flash.type].container
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${
            variantClasses[flash.type].icon
          }`}
        >
          {icons[flash.type]}
        </div>
        <div>
          <h4 className="text-sm text-gray-800 sm:text-base dark:text-white/90">
            {flash.message}
          </h4>
        </div>
      </div>
      <button onClick={handleClick}>
        <FlashCloseIcon className="fill-gray-400 hover:fill-gray-800 dark:hover:fill-white/90" />
      </button>
    </div>
  );
};

export default Flash;
