import styled from "styled-components";
import Link from "next/link";

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
export const Button = styled.button`
  background-color: #d32f2f;
  text-align: center;
  margin: 0 3px 0 3px;
  width: 83px;
  height: 35px;
  border-radius: 9px;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
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
  flex-wrap: wrap;
  padding: 10px;
`;
export const TrPostWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 50px;
`;
export const Footer = styled.footer`
  margin-top: 200px;
`;

export const Box = styled.div`
  background-color: #ffffff;
  flex: 1;
  min-width: calc(25% - 12px);
  max-width: calc(30% - 12px);
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
  background-color: rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  height: 400px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
  text-align: center;
`;
