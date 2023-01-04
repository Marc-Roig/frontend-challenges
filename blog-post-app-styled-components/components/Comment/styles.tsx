"use client";
import styled from "styled-components";

export const ThreadBorder = styled.div<{ addBorder: boolean }>`
  border-left: ${({ addBorder }) => addBorder && "1px solid #ccc"};
`;

export const ThreadContainer = styled.div<{ addMargin: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  // Move the thread container to the right
  margin-left: ${({ addMargin }) => addMargin && `2rem`};
  width: calc(100% - ${({ addMargin }) => addMargin && `2rem`});
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 1.5rem;
  gap: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary[200]};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.secondary[500]};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Username = styled.p`
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondary[500]};
`;

export const Date = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.secondary[500]};
`;

export const Content = styled.p`
  color: ${({ theme }) => theme.colors.primary[100]};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 1rem;
`;

export const InteractButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.secondary[600]};
`;
