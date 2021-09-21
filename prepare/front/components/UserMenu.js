import React, { useContext, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { ThemeContext } from '../pages/_app';
import { useDetectClickOutside } from '../hooks/useDetectClickOutside';

const UserMenuWrapper = styled.div`
  position: relative;
  margin-left: 20px;
  & svg {
    cursor: pointer;
  }
`;

const UserMenuDropdown = styled.div`
  width: 150px;
  position: absolute;
  left: -120px;
  top: 45px;
  background: ${(props) => props.theme.itemBackground};
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  padding: 0;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
  visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  transform: ${({ isActive }) => (isActive ? 'translate3d(0, 0, 0)' : 'translate3d(0, -10px, 0)')};
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: all 200ms ease-in-out;

  & ul {
    width: 100%;
    height: 100%;
  }

  & ul li {
    height: 42px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 13px;
    color: ${(props) => props.theme.text};

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    & a {
      width: 100%;
    }
  }
`;

const UserMenu = () => {
  const { theme } = useContext(ThemeContext);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectClickOutside(dropdownRef, false);

  const onClick = () => setIsActive((prev) => !prev);

  return (
    <UserMenuWrapper onClick={onClick} ref={dropdownRef}>
      <FaUserCircle size={28} />
      <UserMenuDropdown theme={theme} isActive={isActive}>
        <ul>
          <li>
            <Link href="/">
              <a>로그인</a>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <a>회원가입</a>
            </Link>
          </li>
        </ul>
      </UserMenuDropdown>
    </UserMenuWrapper>
  );
};

export default UserMenu;
