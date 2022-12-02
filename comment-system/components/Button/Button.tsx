import styled from "styled-components";

const Button = styled.button`
  border-radius: 8px;
  border-color: transparent;
  padding: 0.5em 1.5em;
  margin: 1.5px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:focus,
  &:focus-visible {
    outline-style: solid;
    outline-color: ${({ theme }) => theme.colors.primary[200]};
    outline-offset: 1.5px;
    outline-width: 1.5px;
  }
`;

export { Button };
