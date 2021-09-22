import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const { addCommentLoading } = useSelector((state) => state.post);

  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone } = useSelector((state) => state.post);

  const onSubmitComment = useCallback(() => {
    console.log(commentText, post.id);
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
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button loading={addCommentLoading} style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
