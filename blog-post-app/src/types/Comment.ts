interface IComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
  };
  postId: string;
  likes: number;
  liked: boolean;
  replyFrom?: { id: string };
  replies: { id: string }[];
  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
