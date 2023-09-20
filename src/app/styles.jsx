import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1150px;
`;
export const Header = styled.header`
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 7px;
  width: 100%;
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
  cursor: pointer;
`;
export const StyledLink = styled(Link)`
  color: white;
  font-weight: 600;
  text-align: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1150px;
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
  flex-direction: row;
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
  width: 230px;
  height: 100px;
  padding: 20px;
  border: 1.5px solid lightgray;
  border-radius: 17px;
  margin: 0 6px 6px 6px;
  transition: transform 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(1.04);
  }
`;
