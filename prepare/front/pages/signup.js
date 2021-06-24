import React, { useState, useCallback, useMemo } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  // styles
  const red = useMemo(() => ({ color: 'red' }), []);
  const marginTop = useMemo(() => ({ marginTop: 10 }), []);
  const padding = useMemo(() => ({ padding: 10 }), []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Form onFinish={onSubmit} style={padding}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input type="email" name="user-email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <div style={red}>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            *** 약관에 동의합니다.
          </Checkbox>
          {termError && <div style={red}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={marginTop}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
