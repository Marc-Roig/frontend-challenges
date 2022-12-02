"use client";

import React from "react";
import styled from "styled-components";
import { Button } from "../../components";

const Title = styled.h1``;

const PostBody = styled.p``;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary[500]};
  background-color: ${({ theme }) => theme.colors.secondary[400]};
  color: ${({ theme }) => theme.colors.primary[200]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 0.5em 1.3em;

  &:focus,
  &:focus-visible {
    outline-style: solid;
    outline-color: ${({ theme }) => theme.colors.primary[200]};
    outline-offset: 1.5px;
    outline-width: 1.5px;
  }
`;

export default function Home() {
  return (
    <>
      <Title>Post</Title>
      <PostBody>Lorem ipsum</PostBody>
      {/* Comment Section */}
      <div>
        <h2>Comments</h2>
        {/* Input */}
        <div>
          <Input type="text" placeholder="Add a comment" />
          <Button>Post</Button>
        </div>
      </div>
    </>
  );
}
