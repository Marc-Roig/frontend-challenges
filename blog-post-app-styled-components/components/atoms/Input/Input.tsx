import styled from "styled-components";

export const Input = styled.textarea`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary[500]};
  background-color: ${({ theme }) => theme.colors.secondary[300]};
  color: ${({ theme }) => theme.colors.primary[200]};
  font-family: inherit;
  padding: 1em 1.3em;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary[500]};
  }
  &:focus,
  &:focus-visible {
    outline-style: solid;
    outline-color: ${({ theme }) => theme.colors.primary[200]};
    outline-offset: 2px;
    outline-width: 2px;
  }
`;
