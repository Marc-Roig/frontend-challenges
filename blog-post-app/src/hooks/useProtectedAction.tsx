import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const useProtectedAction = () => {
  const { status } = useSession();
  const router = useRouter();

  const protectAction = (action?: () => void) => {
    if (status === "authenticated") return action;

    // Redirect to login page
    return () => {
      router.push("/auth/sign-in");
    };
  };

  return { protectAction };
};

export default useProtectedAction;
