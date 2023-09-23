import styled from "styled-components";

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
  border-bottom: 1.5px solid lightgray;
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
