import { Button, Form, Input } from 'antd';
import React, { useCallback, useState, VFC } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import Post from '../interfaces/post';
import { useQuery } from 'react-query';
import User from '../interfaces/user';
import { getMyInfo } from '../apis/user';
import { addComment } from '../apis/post';

const StyledFormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const StyledButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
  z-index: 1;
`;

const CommentForm: VFC<{ post: Post }> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { data: me } = useQuery<User>('user', getMyInfo);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  const onSubmitComment = useCallback(() => {
    if (me) {
      setLoading(true);
      addComment({
        content: commentText,
        postId: post.id,
        userId: me.id,
      })
        .then(() => {
          setCommentText('');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [post.id, commentText, me, setCommentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <StyledFormItem>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <StyledButton loading={loading} type="primary" htmlType="submit">
          등록
        </StyledButton>
      </StyledFormItem>
    </Form>
  );
};

export default CommentForm;
