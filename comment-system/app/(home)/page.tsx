"use client";

import React from "react";
import styled from "styled-components";
import { Button } from "../../components";

const Title = styled.h1``;

const PostBody = styled.p``;

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
          <input type="text" placeholder="Add a comment" />
          <Button>Post</Button>
        </div>
      </div>
    </>
  );
}
