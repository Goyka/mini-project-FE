import styled, { css } from "styled-components";
import Link from "next/link";

/**
 * @author : Goya Gim
 */

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1450px;
`;
export const Header = styled.header`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 7px;
  width: 100%;
  max-width: 1150px;
  position: fixed;
  top: 0;
`;
export const Nav = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const BtnWrap = styled.div`
  padding: 10px;
`;

// Button Theme & Button Components
export const theme = {
  primary: css`
    background-color: #d32f2f;
    color: white;
  `,
  secondary: css`
    background-color: white;
    color: #d32f2f;
    border: 2px solid #d32f2f;
  `,
};

export const Button = styled.button`
  text-align: center;
  margin: 0 3px 0 3px;
  width: 83px;
  height: 35px;
  border-radius: 9px;
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
export const BannerWrap = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const BodyWrap = styled.div`
  margin: 130px auto;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
export const RePostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  margin-top: 50px;
`;
export const RecentPost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px;
  width: 1000px;
`;

export const Footer = styled.footer`
  margin-top: 200px;
`;

export const Box = styled.div`
  background-color: #ffffff;
  flex: 1;
  min-width: calc(20% - 12px);
  max-width: calc(25% - 12px);
  height: 100px;
  padding: 20px;
  border: 1.5px solid lightgray;
  border-radius: 17px;
  margin: 0 6px 12px 6px;
  transition: transform 0.4s;
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

  ${(props) =>
    props.disableBackground &&
    css`
      /* 백그라운드 컬러를 비활성화하는 스타일 */
      background-color: transparent;
    `}
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 400px;
  padding: 20px;
  border-radius: 15px;
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
export const ContentBox = styled.div`
  background-color: #ffffff;

  width: 500px;
  height: 300px;
  padding: 20px;
  border: 2px solid lightgray;
  border-radius: 17px;
  margin: 0 auto;
`;
