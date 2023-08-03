import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #393c3c;
  color: white;
  font-size: 20px;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 0;
`;

const OkButton = styled.button`
  font-size: 16px;
  background-color: #189898;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  font-size: 16px;
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmationModal = ({ activeTab, onCancel }) => {
  const message =
    activeTab === "Users"
      ? "Are you sure you want to delete this user?"
      : "Are you sure you want to delete this post?";
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <ButtonsContainer>
          <OkButton>OK</OkButton>
          <CancelButton onClick={onCancel}>Cancel</CancelButton>
        </ButtonsContainer>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ConfirmationModal;
