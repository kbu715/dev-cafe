import React, { useContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../pages/_app';
import { MODAL_Z_INDEX } from '../../utils/constant';
import { loginRequestAction } from '../../reducers/user';
import useInput from '../../hooks/useInput';

const SignInContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${MODAL_Z_INDEX};
  background: rgba(0, 0, 0, 0.5);
`;

const SignInWrap = styled.form`
  width: 520px;
  height: 480px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
`;

const SignInHeader = styled.header`
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
  & h3 {
    color: ${(props) => props.theme.text};
  }
`;

const CloseButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background: none;
  position: absolute;
  left: 15px;
  top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }
  & svg {
    color: ${(props) => props.theme.text};
  }
`;

const HeaderTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const SignInMain = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  & input::placeholder {
    color: ${(props) => props.theme.text};
  }
`;

const InputWrap = styled.div`
  width: 70%;
  height: 70px;
  & input {
    padding: 15px;
    width: 100%;
    margin-top: 3px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    &:focus {
      outline: none;
      border: 2px solid #8e44ad;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 47px;
  background: #8e44ad;
  color: white;
  font-size: 14px;
  margin-top: 3px;
  border-radius: 5px;

  &:active,
  &:hover {
    background: #9b59b6;
  }
`;

const SignIn = ({ toggleSignIn }) => {
  const { theme } = useContext(ThemeContext);

  const { logInLoading, logInError } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        loginRequestAction({
          email,
          password,
        }),
      );
      toggleSignIn();
    },
    [email, password],
  );

  const onCloseClick = useCallback(() => toggleSignIn(), []);
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleSignIn();
    }
  };

  return (
    <SignInContainer onClick={onMaskClick}>
      <SignInWrap onSubmit={onSubmitForm} theme={theme}>
        <SignInHeader theme={theme}>
          <CloseButton type="button" theme={theme} onClick={onCloseClick}>
            <IoIosClose size={28} />
          </CloseButton>
          <HeaderTitle>로그인</HeaderTitle>
        </SignInHeader>
        <SignInMain theme={theme}>
          <InputWrap>
            <input type="email" name="user-email" required value={email} onChange={onChangeEmail} placeholder="이메일" />
          </InputWrap>
          <InputWrap>
            <input type="password" name="user-password" required value={password} onChange={onChangePassword} placeholder="비밀번호" />
          </InputWrap>
          <LoginButton type="submit" disabled={logInLoading}>
            로그인
          </LoginButton>
        </SignInMain>
      </SignInWrap>
    </SignInContainer>
  );
};

SignIn.propTypes = {
  toggleSignIn: PropTypes.func.isRequired,
};

export default SignIn;
