import React, { useContext, useCallback, useState, VFC } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { ThemeContext } from '../../pages/_app';
import { MODAL_Z_INDEX } from '../../utils/constant';
import useInput from '../../hooks/useInput';
import { useMutation, useQueryClient } from 'react-query';
import { logIn } from '../../apis/user';
import User from '../../interfaces/user';
import { AxiosError } from 'axios';

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

type SignInProps = {
  toggleSignIn: () => void;
};

const SignIn: VFC<SignInProps> = ({ toggleSignIn }) => {
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const mutation = useMutation<User, AxiosError, { email: string; password: string }>('user', logIn, {
    // This function will fire before the mutation function is fired
    // and is passed the same variables the mutation function would receive
    onMutate: (data: { email: string; password: string }) => {
      console.log(data);
      setLoading(true);
    },
    onError: (error) => {
      alert(error.response?.data);
    },
    onSuccess: (user) => {
      console.log(user);
      // setQueryData is sync and assumes that you already synchronously have the data available.
      // 이미 사용가능한 데이터가 있다고 가정할 때
      queryClient.setQueryData('user', user);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const onSubmitForm = useCallback(() => {
    mutation.mutate({ email, password });
    toggleSignIn();
  }, [email, password, mutation, toggleSignIn]);

  const onCloseClick = useCallback(() => toggleSignIn(), []);
  const onMaskClick = (e: React.MouseEvent) => {
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
          <LoginButton type="submit" disabled={loading}>
            로그인
          </LoginButton>
        </SignInMain>
      </SignInWrap>
    </SignInContainer>
  );
};

export default SignIn;
