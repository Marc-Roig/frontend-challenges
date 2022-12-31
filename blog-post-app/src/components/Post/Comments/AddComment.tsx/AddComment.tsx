import React from "react";
import { CommentTextArea } from "./CommentTextArea";

const AddNewComment = ({ postId }: { postId: string }) => {
  return (
    <section className="flex flex-col gap-4 pt-2">
      <h2 className="text-2xl font-semibold">Discussion</h2>
      <CommentTextArea postId={postId} />
    </section>
  );
};

export default AddNewComment;
