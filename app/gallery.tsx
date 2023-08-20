"use client";

import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import Image from "next/image";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Modal from "./modal";

import { User } from "./types/user";

import { getUsers } from "./api/users";

export type GalleryProps = {
  users: User[];
};

const Gallery = () => {
  const [usersList, setUsersList] = useState();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUsers().then((data) => {
      setUsersList(data.results);
    });
  }, []);

  return (
    <div className="user-gallery">
      <h1 className="heading">Users</h1>
      <div className="items">
        {usersList &&
          usersList.map((user, index) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(user.id)}
            >
              <div className="body">
                <img
                  className="avatar-img"
                  src={user.picture.medium}
                  width={100}
                  height={100}
                />
              </div>
              <div className="info">
                <div className="name">
                  {user.name.first} {user.name.last}
                </div>
                <div className="company">
                  {`${user.location.street.name}, ${user.location.city}`}
                </div>
              </div>
            </div>
          ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <img
                      className="avatar-img"
                      src={selectedUser.picture.medium}
                      width={250}
                      height={250}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name.first} ({selectedUser.login.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="value">{`${selectedUser.location.street.number}, ${selectedUser.location.street.name}, ${selectedUser.location.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="field">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name"></div>
                    <div className="catchphrase">
                      
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
