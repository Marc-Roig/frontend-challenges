import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
import { RefObject, useState } from "react";
import useSessionUser from "../../navbar/hooks/useSessionUser";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  LikeButton,
  ReplyButton,
  ShowRepliesButton,
} from "./comment-action-buttons";
import { CommentTextArea } from "./post-comment";
import { AutoAnimate } from "@/utils/animate";

interface CommentProps {
  comment: IComment;
  depth?: number;
}

function ThreadContainer({
  children,
  depth = 0,
}: {
  children: React.ReactNode;
  depth?: number;
}) {
  const borderClass = depth ? "border-l border-brand-border w-full" : "";
  const depthClass = depth ? `ml-8 w-[calc(100%-2rem)]` : "";
  const marginClass = depth ? "mt-6" : "";

  return (
    <div className={borderClass}>
      <div className={`flex flex-col items-start ${depthClass}`}>
        <div className={`w-full ${marginClass}`}>{children}</div>
      </div>
    </div>
  );
}

export function Comment({ comment, depth = 0 }: CommentProps) {
  const { user } = useSessionUser();
  const [loadReplies, setLoadReplies] = useState(false);
  const [createNewReply, setCreateNewReply] = useState(false);

  const { data: replies } = trpc.comment.getComments.useQuery(
    { postId: comment.postId, parentId: comment.id },
    { enabled: loadReplies }
  );

  return (
    <ThreadContainer depth={depth}>
      {/* Comment Container */}
      <div className="border2 surface2 flex w-full flex-grow flex-col items-start gap-4 rounded-xl border-brand-border p-6 shadow-sm">
        {/* Header */}
        <div className="flex w-full justify-between">
          {/* Author Name */}
          <p className="text-xs font-normal text-brand-text2">
            {comment.author.id === user?.id ? "You" : comment.author.name}
          </p>
          {/* Post Date */}
          <p className="text-xs font-light text-brand-text2">
            {comment.createdAt.toDateString()}
          </p>
        </div>
        {/* Comment Content */}
        <p className="text-sm font-light text-brand-text1">{comment.content}</p>
        {/* Footer */}
        <div className="flex w-full justify-end gap-4">
          <ShowRepliesButton
            comment={comment}
            repliesVisible={loadReplies}
            onClick={() => {
              // If new reply is visible, hide it
              if (loadReplies && createNewReply) setCreateNewReply(false);
              setLoadReplies((prev) => !prev);
            }}
          />
          <LikeButton comment={comment} />
          <ReplyButton
            onClick={() => {
              // If replies are not loaded, load them
              if (!loadReplies && !createNewReply) setLoadReplies(true);
              // Toggle new reply
              setCreateNewReply((prev) => !prev);
            }}
          />
        </div>
      </div>
      <AutoAnimate className="w-full">
        {/* New Reply */}
        {createNewReply && (
          <ThreadContainer depth={depth + 1}>
            <div className="w-full">
              <CommentTextArea
                postId={comment.postId}
                parentComment={comment}
              />
            </div>
          </ThreadContainer>
        )}
        {/* Replies */}
        {loadReplies &&
          replies?.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
      </AutoAnimate>
    </ThreadContainer>
  );
}

export default Comment;
