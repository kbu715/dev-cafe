import React, { useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeContext } from '../pages/_app';
import { useDetectClickOutside } from '../hooks/useDetectClickOutside';
import { logoutRequestAction } from '../reducers/user';

const UserMenuWrapper = styled.div`
  position: relative;
  margin-left: 10px;
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-size: 13px;
    color: ${(props) => props.theme.text};
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    button {
      display: block;
      padding: 0 18px;
      width: 100%;
      height: 100%;
    }
  }
`;

const UserMenu = ({ toggleSignIn, toggleSignUp }) => {
  const { theme } = useContext(ThemeContext);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectClickOutside(dropdownRef, false);

  const onClick = () => setIsActive((prev) => !prev);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction);
  }, []);

  return (
    <UserMenuWrapper onClick={onClick} ref={dropdownRef}>
      <FaUserCircle size={24} />
      <UserMenuDropdown theme={theme} isActive={isActive}>
        <ul>
          {!me ? (
            <>
              <li>
                <button type="button" onClick={toggleSignIn}>
                  로그인
                </button>
              </li>
              <li>
                <button type="button" onClick={toggleSignUp}>
                  회원가입
                </button>
              </li>
            </>
          ) : (
            <li>
              <button type="button" onClick={onLogOut}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </UserMenuDropdown>
    </UserMenuWrapper>
  );
};

UserMenu.propTypes = {
  toggleSignIn: PropTypes.func.isRequired,
  toggleSignUp: PropTypes.func.isRequired,
};

export default UserMenu;
