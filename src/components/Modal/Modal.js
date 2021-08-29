import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function Modal({ show, onClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    //listening for the click
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick); //This remove function after unmounting the event
    };
  });

  const handleClick = (e) => {
    //click inside modal
    if (modalRef.current.contains(e.target)) {
      return;
    }
    //outside the modal
    onClose();
  };

  return (
    <>
      <ModalContainer>
        <ModalMain ref={modalRef}>
          <ModalContent>{children}</ModalContent>
        </ModalMain>
      </ModalContainer>
    </>
  );
}

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const ModalMain = styled.div`
  width: 30%;
  position: fixed;
  top: 12rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: white;
  border: none;
  border-radius: 10px;
  padding: 15px 20px;
`;
const ModalContent = styled.div``;
