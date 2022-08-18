import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

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

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentLoading } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment}>
      <StyledFormItem>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <StyledButton loading={addCommentLoading} type="primary" htmlType="submit">
          등록
        </StyledButton>
      </StyledFormItem>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
