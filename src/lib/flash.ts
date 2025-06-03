import { cookies } from "next/headers";

export const setFlash = async (
  type: "success" | "error" | "warning" | "info",
  message: string
) => {
  (await cookies()).set("flash", JSON.stringify({ type, message }), {
    path: "/",
  });
};
