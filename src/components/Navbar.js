import React from "react";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  justify-content: right;
  margin-top: 40px;
  margin-bottom: 20px;
  margin-right: 100px;
`;

const Button = styled.button`
  position: relative;
  background-color: transparent;
  color: ${(props) => (props.active ? "#189898" : "white")};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  font-size: 25px;

  &::after {
    content: "|";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    margin-left: 5px;
    color: white;
    font-size: 18px;
  }

  &:last-child::after {
    display: none;
  }
`;

const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <Wrapper>
      <Button
        active={activeTab === "Posts"}
        onClick={() => onTabChange("Posts")}
      >
        POSTS
      </Button>
      <Button
        active={activeTab === "Users"}
        onClick={() => onTabChange("Users")}
      >
        USERS
      </Button>
    </Wrapper>
  );
};

export default Navbar;
