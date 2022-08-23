import React, { useState, useContext, useCallback, useEffect, useMemo, VFC } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import Router from 'next/router';
import { ThemeContext } from '../../pages/_app';
import useInput from '../../hooks/useInput';
import { MODAL_Z_INDEX } from '../../utils/constant';
import { useQuery } from 'react-query';
import User from '../../interfaces/user';
import { getMyInfo, signUp } from '../../apis/user';
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';

const SignUpContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${MODAL_Z_INDEX};
`;

const SignUpWrap = styled.div`
  width: 520px;
  height: 480px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  box-shadow: 2px 2px 13px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.itemBackground};
`;

const SignUpHeader = styled.header`
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

const SignUpMain = styled.div`
  width: 100%;
  height: 420px;
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

const SubmitButton = styled.button`
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

type SignUpProps = {
  toggleSignUp: () => void;
};

const SignUp: VFC<SignUpProps> = ({ toggleSignUp }) => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery<User>('user', getMyInfo);

  useEffect(() => {
    if (me) {
      console.log('redirect to /');
      Router.replace('/');
    }
  }, [me]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    setLoading(true);
    signUp({
      email,
      nickname,
      password,
    })
      .then(() => {
        Router.replace('/');
      })
      .catch((error: AxiosError) => {
        alert(error.response?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, nickname, password, passwordCheck]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const red = useMemo(() => ({ color: 'red' }), []);

  const onCloseClick = useCallback(() => toggleSignUp(), []);
  const onMaskClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleSignUp();
    }
  };

  return (
    <SignUpContainer onClick={onMaskClick}>
      <SignUpWrap theme={theme}>
        <SignUpHeader theme={theme}>
          <CloseButton type="button" theme={theme} onClick={onCloseClick}>
            <IoIosClose size={28} />
          </CloseButton>
          <HeaderTitle>회원가입</HeaderTitle>
        </SignUpHeader>
        <SignUpMain theme={theme}>
          <InputWrap>
            <input type="email" name="user-email" required value={email} onChange={onChangeEmail} placeholder="이메일" />
          </InputWrap>
          <InputWrap>
            <input type="text" name="user-nick" required value={nickname} onChange={onChangeNickname} placeholder="닉네임" />
          </InputWrap>
          <InputWrap>
            <input type="password" name="password" required value={password} onChange={onChangePassword} placeholder="비밀번호" />
          </InputWrap>
          <InputWrap>
            <input name="password" type="password" required value={passwordCheck} onChange={onChangePasswordCheck} placeholder="비밀번호 확인" />
            {passwordError && <div style={red}>비밀번호가 일치하지 않습니다.</div>}
          </InputWrap>
          <SubmitButton type="submit" disabled={loading} onClick={onSubmit}>
            회원가입
          </SubmitButton>
        </SignUpMain>
      </SignUpWrap>
    </SignUpContainer>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  console.log(cookie);
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  const response = await getMyInfo();
  if (response.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default SignUp;
