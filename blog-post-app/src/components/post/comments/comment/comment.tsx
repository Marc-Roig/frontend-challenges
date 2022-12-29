import type IComment from "@/types/Comment";
import { trpc } from "@/utils/trpc";
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
} from "./styles";
import { formatDate } from "@/utils/common";
import DropdownMenu from "@/components/ui/dropdown/dropdown-menu";
import { CommentTextArea } from "../AddComment.tsx/CommentTextArea";

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
  const marginClass = depth ? "mt-6" : "";

  return (
    <ThreadBorder depth={depth}>
      <ThreadContainerStyle depth={depth}>
        <div className={`w-full ${marginClass}`}>{children}</div>
      </ThreadContainerStyle>
    </ThreadBorder>
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
      <CommentContainer>
        <Header>
          <PostInfo>
            <Author>
              {comment.author.id === user?.id ? "You" : comment.author.name}
            </Author>
            {"•"}
            <PublicationDate>{formatDate(comment.createdAt)}</PublicationDate>
          </PostInfo>
          <DropdownMenu className="-mr-2" />
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
      <AutoAnimate className="w-full">
        {/* New Reply */}
        {createNewReply && (
          <ThreadContainer depth={depth + 1}>
            <div className="w-full">
              <CommentTextArea
                postId={comment.postId}
                parentComment={comment}
                unfoldDefault={true}
                placeHolderDefault="Reply to this comment"
                discardHandler={() => setCreateNewReply(false)}
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
