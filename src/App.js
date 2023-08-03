import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import PostTable from "./components/PostTable";
import UserTable from "./components/UserTable";
import styled, { createGlobalStyle } from "styled-components";
import Modal from "./components/Modal";
import UserForm from "./components/UserForm";
import PostForm from "./components/PostForm";
import ConfirmationModal from "./components/ConfirmationModal";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color:white;
    background: linear-gradient(to bottom right, #2E414F,#202D37 50%,#189898); 
    font-family: Arial, sans-serif; 
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  margin-top: 20px;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  margin-left: 60px;
  color: white;
  display: flex;
  align-items: center;
`;

const CreateButton = styled.button`
  font-family: "Roboto", sans-serif;
  color: white;
  background-color: #189898;
  border: none;
  padding: 20px 40px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
`;

const RightButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  margin-right: 35px;
  margin-top: 20px;
`;

const usersAPI = "https://jsonplaceholder.typicode.com/users";
const postsAPI = "https://jsonplaceholder.typicode.com/posts";

const fetchUsersData = async () => {
  try {
    const response = await fetch(usersAPI);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching users data:", error);
    return [];
  }
};

const fetchPostsData = async () => {
  try {
    const response = await fetch(postsAPI);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching posts data:", error);
    return [];
  }
};

function App() {
  const [currentTable, setCurrentTable] = useState("users");
  const [usersData, setUsersData] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [activeTab, setActiveTab] = useState("Users");

  useEffect(() => {
    if (activeTab === "Users") {
      console.log("Fetching users data...");
      fetchUsersData()
        .then((data) => {
          console.log("Users data:", data);
          setUsersData(data);
        })
        .catch((error) => {
          console.error("Error fetching users data:", error);
          setUsersData([]); // Setting an empty array in case of an error
        });
    } else if (activeTab === "Posts") {
      console.log("Fetching posts data...");
      fetchPostsData()
        .then((data) => {
          console.log("Posts data:", data);
          setPostsData(data);
        })
        .catch((error) => {
          console.error("Error fetching posts data:", error);
          setPostsData([]); // Setting an empty array in case of an error
        });
    }
  }, [activeTab]);

  //State variables for creating user/post modal
  const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);

  //State variable for delete user/post modal
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // State variables for edit user modal
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  //State variables for edit post modal
  const [isEditPostModalOpen, setEditPostModalOpen] = useState(false);
  const [editPostData, setEditPostData] = useState(null);

  // Functions to open and close edit modals
  const openEditUserModal = (userData) => {
    setEditUserData(userData);
    setEditUserModalOpen(true);
  };

  const closeEditUserModal = () => {
    setEditUserData(null);
    setEditUserModalOpen(false);
  };

  const openEditPostModal = (postData) => {
    setEditPostData(postData);
    setEditPostModalOpen(true);
  };

  const closeEditPostModal = () => {
    setEditPostData(null);
    setEditPostModalOpen(false);
  };

  // Functions to open and close create modals
  const openCreateUserModal = () => {
    setCreateUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setCreateUserModalOpen(false);
  };

  const openCreatePostModal = () => {
    setCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  //Functions to handle the click of "Posts" or "Users" button
  const handleButtonClick = (tableName) => {
    setCurrentTable(tableName);
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (isCreateUserModalOpen) {
      document.documentElement.scrollTop = 0;
    }
  }, [isCreateUserModalOpen]);

  //Funtion to handle cancel button for delete modal
  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  // Function to handle delete button click
  const handleDelete = (item) => {
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <GlobalStyle />
      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === "Users" ? (
        <div>
          <Heading>
            USERS
            <RightButtonsContainer>
              <CreateButton onClick={openCreateUserModal}>
                + CREATE USER
              </CreateButton>
            </RightButtonsContainer>
          </Heading>
          {usersData.length > 0 ? (
            <UserTable
              data={usersData}
              tableType="users"
              onEditUser={openEditUserModal}
              onDelete={handleDelete}
            />
          ) : (
            <p>Loading users data...</p>
          )}
          <Modal isOpen={isCreateUserModalOpen} onClose={closeCreateUserModal}>
            <UserForm onClose={closeCreateUserModal} userData={null} />
          </Modal>
          <Modal isOpen={isEditUserModalOpen} onClose={closeEditUserModal}>
            <UserForm onClose={closeEditUserModal} userData={editUserData} />
          </Modal>
          {showConfirmationModal && (
            <ConfirmationModal activeTab="Users" onCancel={handleCancel} />
          )}
        </div>
      ) : (
        <div>
          <Heading>
            POSTS
            <RightButtonsContainer>
              <CreateButton onClick={openCreatePostModal}>
                + CREATE POSTS
              </CreateButton>
            </RightButtonsContainer>
          </Heading>
          {postsData.length > 0 ? (
            <PostTable
              data={postsData}
              tableType="posts"
              onEditPost={openEditPostModal}
              onDelete={handleDelete}
            />
          ) : (
            <p>Loading posts data...</p>
          )}
          <Modal isOpen={isCreatePostModalOpen} onClose={closeCreatePostModal}>
            <PostForm onClose={closeCreatePostModal} postData={null} />
          </Modal>
          <Modal isOpen={isEditPostModalOpen} onClose={closeEditPostModal}>
            <PostForm onClose={closeEditPostModal} postData={editPostData} />
          </Modal>
          {showConfirmationModal && (
            <ConfirmationModal activeTab="Posts" onCancel={handleCancel} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
