import styled from "styled-components";

const Button = styled.button`
  color: ${({ theme }) => theme.colors.secondary[200]};
  border-radius: ${({ theme }) => theme.radius.lg};
  border-color: transparent;
  padding: 1em 2em;
  margin: 1.5px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background-color: ${({ theme }) => theme.colors.primary[100]};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:focus,
  &:focus-visible {
    outline-style: solid;
    outline-color: ${({ theme }) => theme.colors.primary[200]};
    outline-offset: 2px;
    outline-width: 2px;
  }
`;

export { Button };
