"use client";

import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Login from "../Login/page";
import Join from "../Join/page";

const Modal = () => {
  // 모달을 노출하는 페이지

  const [modalSecond, setModalSecond] = useState(false);

  const secondModal = () => {
    setModalSecond(!modalSecond);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setModalSecond(false);
  };

  // 모달 내부를 클릭해도 모달이 닫히지 않도록 처리하는 함수
  const preventCloseInsideModal = (event) => {
    event.stopPropagation();
  };

  const closeBtn = (event) => {
    event.stopPropagation();
  };

  const animationTiming = {
    enter: 400,
    exit: 500,
  };
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <>
      <div>
        <SecondModal
          onClick={secondModal}
          backgroundColor={"white"}
          borderColor={"rgb(250, 177, 160)"}
        >
          open modal
        </SecondModal>
        {modalSecond && (
          <Modals onClick={closeModal}>
            <BackgroundModal></BackgroundModal>
            <PreventCloseInsideModalDiv onClick={preventCloseInsideModal}>
              <ModalContent>
                <Content>
                  <Login />
                </Content>

                {/* <Content></Content> {switchOn ? <login /> : <join />} */}
                <SecondCloseModal onClick={secondModal}>X</SecondCloseModal>
              </ModalContent>
            </PreventCloseInsideModalDiv>
          </Modals>
        )}
      </div>
    </>
  );
};

const ModalBox = styled.div`
  display: flex;
  width: 500px;
  height: 400px;
`;

const SecondModal = styled.button`
  display: block;
  width: 180px;
  height: 100px;
  padding: 20px;
  margin: 20px;
  font-size: 14px;
  border-radius: 8px;
  border: 3px solid ${(props) => props["borderColor"]};
  background-color: ${(props) => props["backgroundColor"]};
`;
const Modals = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 1;
`;
const BackgroundModal = styled.div`
  background: rgba(134, 132, 132, 0.621);
  width: 100%;
  height: 100%;
`;
const ModalContent = styled.div`
  width: 500px;
  height: 300px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fbfbfb;
  border: 2px dotted #c8c8c8;
  /* padding: 14px 28px; */
  border-radius: 8px;
  /* max-width: 600px;
  min-width: 300px; */
  height: 400px;
`;
const Content = styled.div``;
const CloseModal = styled.button`
  position: absolute;
  left: 200px;
  top: 150px;
  padding: 10px 15px;
  border-radius: 10px;
  border-radius: 10px;
  border: 1px solid #c8c8c8;
`;
const OkayBtn = styled.button`
  position: absolute;
  left: 300px;
  top: 150px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #c8c8c8;
`;
const SecondCloseModal = styled.button`
  position: absolute;
  left: 420px;
  top: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid #c8c8c8;
`;

// 모달 내부 클릭 이벤트를 막는 스타일드 컴포넌트
const PreventCloseInsideModalDiv = styled.div`
  cursor: auto;
`;

export default Modal;
