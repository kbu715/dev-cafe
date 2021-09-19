import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeContext } from '../pages/_app';

const UserWrapper = styled.aside`
  position: relative;
  & svg {
    cursor: pointer;
  }
`;

const UserMenuDropdown = styled.div`
  width: 175px;
  height: 200px;
  position: absolute;
  left: -150px;
  top: 40px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
`;

const User = () => {
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onUserClick = () => setUserMenuToggle((prev) => !prev);

  return (
    <UserWrapper onClick={onUserClick}>
      <FaUserCircle size={33} />
      {userMenuToggle && <UserMenuDropdown theme={theme} />}
    </UserWrapper>
  );
};

export default User;
