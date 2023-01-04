import React from "react";
import { Button } from "../components";
import { Comment } from "../components/Comment/Comment";
import CommentType from "../types/Comment";
import {
  Main,
  Title,
  PostBody,
  CommentInput,
  Input,
  CommentSection,
} from "../components/Home/styles";

const comments: CommentType[] = [
  {
    id: 1,
    content:
      "I can't believe how much technology has advanced to allow us to capture such incredible footage of space. It's truly mind-blowing to see all the different types of galaxies and to learn about the different phenomena occurring in the universe. The images are so clear and detailed, it's like I'm looking through a telescope! I could watch this video on repeat for hours, just soaking up all the fascinating information and stunning visuals. Great job!",
    username: "John Doe",
    likes: 0,
    liked: false,
    replies: [
      {
        id: 2,
        content: "I agree! It's so cool to see the universe in such detail.",
        username: "Jane Doe",
        likes: 0,
        liked: false,
        replies: [
          {
            id: 3,
            content:
              "Thank you so much for the kind words! I'm really glad you enjoyed the video and found it informative. It's amazing how much technology has advanced to allow us to capture such incredible footage of space. I'm always amazed by the vastness of the universe and the incredible things that exist out there. I'm glad you were able to appreciate the visuals and the music as well. Thank you for taking the time to watch and comment on the video!",
            username: "John Doe",
            likes: 0,
            liked: false,
            replies: [],
            createdAt: new Date("2021-01-01"),
            updatedAt: new Date("2021-01-01"),
          },
        ],
        createdAt: new Date("2021-01-01"),
        updatedAt: new Date("2021-01-01"),
      },
    ],
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
  },
  {
    id: 4,
    content:
      "I love this video! It's so beautiful and relaxing to watch. I could watch it on repeat for hours. The music is so soothing and the visuals are stunning. I love how you included so many different types of galaxies and space phenomena. It's so interesting to learn about the different types of galaxies and to see them in such detail. I'm always amazed by the vastness of the universe and the incredible things that exist out there. Great job!",
    username: "Jane Doe",
    likes: 0,
    liked: false,
    replies: [],
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2021-01-01"),
  },
];

export default function Home() {
  return (
    <Main>
      <Title>Uncovering the secrets of the universe</Title>
      <PostBody>
        Space is a vast and fascinating frontier that has captivated the human
        imagination for centuries. From the earliest civilizations, people have
        gazed up at the stars and wondered what lies beyond the boundaries of
        our world. Today, we have sent probes and spacecraft to explore the vast
        expanse of space, and we have discovered a wealth of fascinating facts
        and mysteries.
      </PostBody>
      {/* Comment Section */}
      <div>
        <h2>Comments</h2>
        <CommentInput>
          <Input placeholder="Add a comment" />
          <Button>Post</Button>
        </CommentInput>
        <CommentSection>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
          ))}
        </CommentSection>
      </div>
    </Main>
  );
}
