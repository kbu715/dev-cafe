import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeContext } from '../pages/_app';
import { useDetectClickOutside } from '../hooks/useDetectClickOutside';

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
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  transform: ${({ isActive }) => (isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, -10px, 0)')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: all 200ms ease-in-out;
`;

const UserMenu = () => {
  const { theme } = useContext(ThemeContext);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectClickOutside(dropdownRef, false);

  const onClick = () => setIsActive((prev) => !prev);

  return (
    <UserMenuWrapper onClick={onClick} ref={dropdownRef}>
      <FaUserCircle size={28} />
      <UserMenuDropdown theme={theme} isActive={isActive} />
    </UserMenuWrapper>
  );
};

export default UserMenu;
