import type IComment from "@/types/Comment";
import { AiOutlineComment } from "react-icons/ai";
import ActionButton from "./ActionButton";

function ReplyButton({ onClick }: { onClick?: () => void }) {
  return (
    <ActionButton onClick={onClick}>
      <AiOutlineComment size={"1.25rem"} />
      <p className="hidden text-sm md:block">Reply</p>
    </ActionButton>
  );
}

function getRepliesText(comment: IComment, repliesVisible: boolean) {
  if (comment?.replies.length === 0) return "";
  if (repliesVisible) return "Hide replies";

  const repliesText = comment?.replies.length > 1 ? "replies" : "reply";
  return `${comment.replies.length} ${repliesText}`;
}

function ShowRepliesButton({
  comment,
  repliesVisible,
  onClick,
}: {
  comment: IComment;
  repliesVisible: boolean;
  onClick?: () => void;
}) {
  const repliesText = getRepliesText(comment, repliesVisible);
  return (
    <button className="text-sm font-light" onClick={onClick}>
      {repliesText}
    </button>
  );
}

export { ReplyButton, ShowRepliesButton };
