import { isContentEditable } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 25px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #262929;
  color: white;
  width: 90%;
  padding: 10px;
  font-size: 20px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 30px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px 0;
  gap: 40px;
`;

const CloseButton = styled.button`
  font-size: 25px;
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 30px;
`;

const CreatePostButton = styled.button`
  font-size: 25px;
  background-color: #189898;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  cursor: pointer;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  font-size: 40px;
  font-weight: 300;
  color: #189898;
`;

const PostForm = ({ onClose, postData }) => {
  const isEdit = !!postData;
  const buttonLabel = isEdit ? "Update Post" : "Create Post";
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (postData) {
      setFormData(postData);
    }
  }, [postData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <FormContainer>
      <HeadingContainer>
        <Heading>{isEdit ? "Edit Post" : "Create Post"}</Heading>
      </HeadingContainer>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>Username</Label>
          </LabelContainer>
          <Input type="text" />
        </div>
        <div>
          <LabelContainer>
            <Label>UserID</Label>
          </LabelContainer>
          <Input type="text" />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>Title</Label>
          </LabelContainer>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelContainer>
            <Label>Body</Label>
          </LabelContainer>
          <Input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <ButtonsContainer>
        <CloseButton onClick={onClose}>x Cancel</CloseButton>
        <CreatePostButton>{buttonLabel}</CreatePostButton>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default PostForm;
