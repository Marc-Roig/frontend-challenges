import styled from "styled-components";
import { Input as BaseInput } from "../atoms/Input/Input";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: min(80vw, 800px);
  margin-top: 2rem;
`;

export const Title = styled.h1``;

export const PostBody = styled.p`
  text-align: justify;
`;

export const CommentInput = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Input = styled(BaseInput)`
  flex: 1;
  min-width: 200px;
`;

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;
