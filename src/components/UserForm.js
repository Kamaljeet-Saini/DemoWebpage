import React, { useState, useEffect } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const LabelContainer = styled.div`
  display: flex;
  justify-content: center; /* Center the text horizontally */
  align-items: center; /* Center the text vertically */
`;

const Label = styled.label`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: #262929;
  color: white;
  width: 90%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding: 20px 0;
`;

const CloseButton = styled.button`
  font-size: 25px;
  background-color: white;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
`;

const CreateUserButton = styled.button`
  font-size: 25px;
  background-color: #189898;
  color: black;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h2`
  font-size: 30px;
  font-weight: 300;
  color: #189898;
`;

const UserForm = ({ onClose, userData }) => {
  const isEdit = !!userData;
  const buttonLabel = isEdit ? "Update User" : "Create User";

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <FormContainer>
      <HeadingContainer>
        <Heading>{isEdit ? "Edit User" : "Create User"}</Heading>
      </HeadingContainer>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>Name</Label>
          </LabelContainer>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelContainer>
            <Label>Username</Label>
          </LabelContainer>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>Email</Label>
          </LabelContainer>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelContainer>
            <Label>Phone no.</Label>
          </LabelContainer>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>Street</Label>
          </LabelContainer>
          <Input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelContainer>
            <Label>Suite</Label>
          </LabelContainer>
          <Input
            type="text"
            name="address.suite"
            value={formData.address.suite}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <FormRow>
        <div>
          <LabelContainer>
            <Label>City</Label>
          </LabelContainer>
          <Input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <LabelContainer>
            <Label>Zipcode</Label>
          </LabelContainer>
          <Input
            type="text"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
          />
        </div>
      </FormRow>
      <ButtonsContainer>
        <CloseButton onClick={onClose}>x Cancel</CloseButton>
        <CreateUserButton>{buttonLabel}</CreateUserButton>
      </ButtonsContainer>
    </FormContainer>
  );
};

export default UserForm;
