import { useSession } from "next-auth/react";

const useSessionUser = () => {
  const { data, status } = useSession();

  return {
    user: data?.user,
    status,
  };
};

export default useSessionUser;
