import { router } from "../../trpc";

import getProfile from "./get-profile";

export const userRouter = router({
  getProfile,
});
