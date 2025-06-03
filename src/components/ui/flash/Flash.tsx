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
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M3.55 12a8.448 8.448 0 1 1 16.897 0 8.448 8.448 0 0 1-16.896 0M12 2.052c-5.494 0-9.948 4.454-9.948 9.948s4.454 9.948 9.948 9.948 9.948-4.454 9.948-9.948S17.493 2.052 12 2.052m3.514 8.581a.75.75 0 1 0-1.061-1.06l-3.264 3.263-1.642-1.642a.75.75 0 0 0-1.06 1.06l2.172 2.173a.75.75 0 0 0 1.06 0z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.125 4.54h7.749a.75.75 0 0 1 .65.374l3.874 6.711a.75.75 0 0 1 0 .75l-3.875 6.71a.75.75 0 0 1-.65.376H8.126a.75.75 0 0 1-.65-.375L3.6 12.375a.75.75 0 0 1 0-.75l3.875-6.71a.75.75 0 0 1 .65-.376m7.749-1.5h-7.75a2.25 2.25 0 0 0-1.948 1.124l-3.875 6.711a2.25 2.25 0 0 0 0 2.25l3.875 6.71a2.25 2.25 0 0 0 1.949 1.126h7.749a2.25 2.25 0 0 0 1.948-1.125l3.875-6.711a2.25 2.25 0 0 0 0-2.25l-3.875-6.71a2.25 2.25 0 0 0-1.948-1.126M12 7.81a.75.75 0 0 1 .75.75v4.22a.75.75 0 0 1-1.5 0V8.56a.75.75 0 0 1 .75-.75M11 15.33a1 1 0 1 1 1 1 1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.95 3.875c-.866-1.5-3.031-1.5-3.897 0l-7.506 13c-.866 1.5.216 3.375 1.949 3.375h15.01c1.733 0 2.815-1.875 1.95-3.375zm-2.598.75a.75.75 0 0 1 1.299 0l7.505 13a.75.75 0 0 1-.65 1.125H4.497a.75.75 0 0 1-.65-1.125zm.65 3.936a.75.75 0 0 1 .75.75v4.22a.75.75 0 0 1-1.5 0V9.31a.75.75 0 0 1 .75-.75M11 16.08a1 1 0 1 1 1 1 1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M13.95 3.875c-.866-1.5-3.031-1.5-3.897 0l-7.506 13c-.866 1.5.216 3.375 1.949 3.375h15.01c1.733 0 2.815-1.875 1.95-3.375zm-2.598.75a.75.75 0 0 1 1.299 0l7.505 13a.75.75 0 0 1-.65 1.125H4.497a.75.75 0 0 1-.65-1.125zm.65 3.936a.75.75 0 0 1 .75.75v4.22a.75.75 0 0 1-1.5 0V9.31a.75.75 0 0 1 .75-.75M11 16.08a1 1 0 1 1 1 1 1 1 0 0 1-1-1"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  };

  const [flash, setFlash] = useState<{
    type: "success" | "error" | "warning" | "info" | null;
    message: string | null;
  }>({ type: null, message: null });

  useEffect(() => {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith("flash="))
      ?.split("=")[1];

    if (value) {
      const parsedValue = JSON.parse(decodeURIComponent(value));
      setFlash(parsedValue);
      document.cookie = "flash=; max-age=0; path=/";
    }
  }, []);

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
      <button onClick={() => setFlash({ type: null, message: null })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          className="fill-gray-400 hover:fill-gray-800 dark:hover:fill-white/90"
        >
          <path
            fillRule="evenodd"
            d="M6.043 16.542a1 1 0 1 0 1.414 1.414L12 13.414l4.542 4.542a1 1 0 0 0 1.414-1.414L13.413 12l4.542-4.542a1 1 0 0 0-1.414-1.414l-4.542 4.542-4.542-4.542A1 1 0 1 0 6.043 7.46L10.585 12z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Flash;
