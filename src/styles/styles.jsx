import styled, { css } from "styled-components";
import Link from "next/link";

// Button Theme & Button Components
export const theme = {
  primary: css`
    background-color: black;
    color: #00ccd8;
  `,
  secondary: css`
    background-color: white;
    color: black;
    border: 2px solid black;
  `,
};

export const Button = styled.button`
  text-align: center;
  margin: 0 3px 0 3px;
  width: 83px;
  height: 35px;
  border-radius: 39px;
  border: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
  ${({ buttontheme }) => buttontheme === "primary" && theme.primary};
  ${({ buttontheme }) => buttontheme === "secondary" && theme.secondary};
`;
Button.shouldForwardProp = (prop) => prop !== "buttontheme";

export const StyledLink = styled(Link)`
  color: white;
  font-weight: 600;
  text-decoration: none;
`;

export const Box = styled.div`
  background-color: #ffffff;
  flex: 1;
  min-width: calc(25% - 12px);
  max-width: calc(25% - 12px);
  min-height: calc(25% - 12px);
  height: 100px;
  padding: 20px;
  border: 1.5px solid lightgray;
  border-radius: 27px;
  margin: 0 9px 18px 9px;
  transition: transform 0.6s;
  cursor: pointer;

  &:hover {
    transform: scale(1.04);
  }
`;

export const ModalWrap = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 250px;
  padding: 10px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Spinner
export const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

// detail page
export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentBox = styled.div`
  background-color: transparent;
  display: flex;
  width: 750px;
  min-height: 250px;
  height: 100%;
  padding: 20px;
  border: 1.5px solid lightgray;
  border-radius: 15px;
  margin: 0 auto 10px auto;
`;

export const ErrorMessage = styled.div`
  max-width: 200px;
  color: red;
  font-size: 12px;
  margin: 2px;
`;

export const Input = styled.input`
  margin: 5px 0 5px 0;
  width: 200px;
  height: 22px;
  border-radius: 5px;
  border: 2px solid lightgray;
  font-size: 12px;
  text-align: center;
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
