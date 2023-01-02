import type IComment from "@/types/Comment";
import { useState } from "react";
import useSessionUser from "../../../Navbar/hooks/useSessionUser";
import { LikeButton, ReplyButton, ShowRepliesButton } from "../ActionButtons";
import { AutoAnimate } from "@/utils/animate";
import {
  ThreadContainer as ThreadContainerStyle,
  ThreadBorder,
  CommentContainer,
  Content,
  Footer,
  Header,
  Author,
  PublicationDate,
  PostInfo,
} from "./Comment.styles";
import { formatDate } from "@/utils/common";
import { CommentTextArea } from "../AddComment.tsx/CommentTextArea";
import CommentDropdownMenu from "./DropdownMenu";
import useEditingComment from "../hooks/useEditingComment";
import { useGetComments } from "../hooks/useComments";
import Avatar from "@/components/ui/Avatar/Avatar";
import { trpc } from "@/utils/trpc";

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
  const marginClass = depth ? "pt-6" : "";

  return (
    <ThreadBorder depth={depth}>
      <ThreadContainerStyle depth={depth}>
        <div className={`w-full ${marginClass}`}>{children}</div>
      </ThreadContainerStyle>
    </ThreadBorder>
  );
}

/**
 *  Used to show an individual comment in a comment thread.
 */
function Comment({
  comment,
  loadReplies,
  setLoadReplies,
  createNewReply,
  setCreateNewReply,
}: {
  comment: IComment;
  loadReplies: boolean;
  setLoadReplies: React.Dispatch<React.SetStateAction<boolean>>;
  createNewReply: boolean;
  setCreateNewReply: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { user } = useSessionUser();
  const { data: authorUser } = trpc.user.getProfile.useQuery({
    id: comment.author.id,
  });

  return (
    <CommentContainer>
      <Header>
        <PostInfo>
          <Avatar
            size={"sm"}
            className="mr-1"
            src={authorUser?.image || undefined}
          />
          <Author>
            {comment.author.id === user?.id ? "You" : comment.author.name}
          </Author>
          {"•"}
          <PublicationDate>{formatDate(comment.createdAt)}</PublicationDate>
        </PostInfo>
        <CommentDropdownMenu comment={comment} />
      </Header>
      <Content>{comment.content}</Content>
      <Footer>
        <LikeButton comment={comment} />
        <ReplyButton
          onClick={() => {
            // If replies are not loaded, load them
            if (!loadReplies && !createNewReply) setLoadReplies(true);
            // Toggle new reply
            setCreateNewReply((prev) => !prev);
          }}
        />
        <ShowRepliesButton
          comment={comment}
          repliesVisible={loadReplies}
          onClick={() => {
            // If new reply is visible, hide it
            if (loadReplies && createNewReply) setCreateNewReply(false);
            setLoadReplies((prev) => !prev);
          }}
        />
      </Footer>
    </CommentContainer>
  );
}

export function CommentThread({ comment, depth = 0 }: CommentProps) {
  const [loadReplies, setLoadReplies] = useState(false);
  const [createNewReply, setCreateNewReply] = useState(false);
  const { isCommentBeingEdited } = useEditingComment();

  const { comments: replies } = useGetComments(
    { postId: comment.postId, parentId: comment.id, order: "asc" },
    { enabled: loadReplies }
  );

  return (
    <ThreadContainer depth={depth}>
      {isCommentBeingEdited(comment.id) ? (
        <CommentTextArea
          key={comment.id}
          postId={comment.postId}
          comment={comment}
          unfoldDefault
          value={comment.content}
          mode="edit"
        />
      ) : (
        <Comment
          comment={comment}
          loadReplies={loadReplies}
          setLoadReplies={setLoadReplies}
          createNewReply={createNewReply}
          setCreateNewReply={setCreateNewReply}
        />
      )}

      <AutoAnimate className="w-full">
        {/* New Reply */}
        {createNewReply && (
          <ThreadContainer depth={depth + 1}>
            <div className="w-full">
              <CommentTextArea
                postId={comment.postId}
                parentComment={comment}
                unfoldDefault={true}
                placeholder="Reply to this comment"
                discardHandler={() => setCreateNewReply(false)}
              />
            </div>
          </ThreadContainer>
        )}
        {/* Replies */}
        {loadReplies &&
          replies?.map((reply) => (
            <CommentThread key={reply.id} comment={reply} depth={depth + 1} />
          ))}
      </AutoAnimate>
    </ThreadContainer>
  );
}

export default CommentThread;
