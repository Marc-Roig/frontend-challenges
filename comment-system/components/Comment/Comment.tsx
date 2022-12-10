"use client";

import React from "react";
import CommentType from "../../types/Comment";
import {
  Container,
  Content,
  Date,
  Footer,
  Header,
  InteractButton,
  ThreadBorder,
  ThreadContainer,
  Username,
} from "./styles";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineEdit,
} from "react-icons/ai";

export function Comment({
  comment,
  depth = 0,
}: {
  comment: CommentType;
  depth?: number;
}) {
  const CommentContainer = <></>;
  return (
    <ThreadBorder addBorder={depth > 0}>
      <ThreadContainer addMargin={depth > 0}>
        <Container>
          <Header>
            <Username>{comment.username}</Username>
            <Date>{comment.createdAt?.toDateString()}</Date>
          </Header>
          <Content>{comment.content}</Content>
          <Footer>
            <InteractButton>
              <AiOutlineHeart size={"1.25rem"} />
            </InteractButton>
            <InteractButton>
              <AiOutlineComment size={"1.25rem"} />
            </InteractButton>
            <InteractButton>
              <AiOutlineEdit size={"1.25rem"} />
            </InteractButton>
          </Footer>
        </Container>
        {comment.replies?.map((reply) => (
          <Comment key={reply.id} comment={reply} depth={depth + 1} />
        ))}
      </ThreadContainer>
    </ThreadBorder>
  );
}
