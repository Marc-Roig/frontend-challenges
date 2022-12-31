import { type NextPage } from "next";
import Head from "next/head";
import { Container } from "@/components/ui/Container";
import Navbar from "@/components/Navbar/Navbar";
import { Article, Comment, PostNewComment } from "@/components/Post";
import { AutoAnimate } from "@/utils/animate";
import { useGetComments } from "@/components/Post/Comments/hooks/useComments";
import { Button } from "@/components/ui/Button";
import { AiOutlineArrowDown } from "react-icons/ai";

const POST_ID = "clcc3dbae0001n0ro69sj8lut";

const Home: NextPage = () => {
  const { comments, fetchNextPage, hasNextPage } = useGetComments(POST_ID);

  return (
    <>
      <Head>
        <title>Blog Post App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className={`mt-8 min-w-full transition-colors duration-500`}>
        <Container className="mb-8 flex flex-col gap-6">
          <Article />
          <PostNewComment postId={POST_ID} />
          {/* Comment List */}
          <AutoAnimate className="mt-8 flex w-full flex-col gap-6">
            {comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </AutoAnimate>
          {/* Load more comments */}
          {hasNextPage && (
            <Button variant="subtle" onClick={() => fetchNextPage()}>
              Load more <AiOutlineArrowDown className="ml-2" />
            </Button>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
