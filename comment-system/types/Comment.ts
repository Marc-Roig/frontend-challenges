interface Comment {
  id: number;
  content: string;
  username: string;
  likes: number;
  liked: boolean;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export default Comment;
