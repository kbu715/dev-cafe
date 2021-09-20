import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeContext } from '../pages/_app';

const UserMenuWrapper = styled.div`
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
  top: 45px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  visibility: ${({ userMenuToggle }) => (userMenuToggle ? 'visible' : 'hidden')};
  transform: ${({ userMenuToggle }) => (userMenuToggle ? 'translate3d(0, 0, 0)' : 'translate3d(0, -10px, 0)')};
  opacity: ${({ userMenuToggle }) => (userMenuToggle ? 1 : 0)};
  transition: all 200ms ease-in-out;
`;

const UserMenu = () => {
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const { theme } = useContext(ThemeContext);

  const onUserClick = () => setUserMenuToggle((prev) => !prev);

  return (
    <UserMenuWrapper onClick={onUserClick}>
      <FaUserCircle size={33} />
      <UserMenuDropdown theme={theme} userMenuToggle={userMenuToggle} />
    </UserMenuWrapper>
  );
};

export default UserMenu;
