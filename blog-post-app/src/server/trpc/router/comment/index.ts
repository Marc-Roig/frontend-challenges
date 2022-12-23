import { router } from "../../trpc";
import getComments from "./get-comments";
import create from "./create-comment";
import { like, unlike } from "./like";

export const commentRouter = router({
  create,
  getComments,
  like,
  unlike,
});
