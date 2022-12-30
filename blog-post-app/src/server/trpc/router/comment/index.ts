import { router } from "../../trpc";
import create from "./create-comment";
import getComments from "./get-comments";
import deleteComment from "./delete";
import { like, unlike } from "./like";

export const commentRouter = router({
  create,
  getComments,
  deleteComment,
  like,
  unlike,
});
