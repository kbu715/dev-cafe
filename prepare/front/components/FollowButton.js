import React, { useCallback } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onFollow = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          id: post.User.id,
          nickname: post.User.nickname,
        },
      });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string,
    }),
    Images: PropTypes.array,
    Comments: PropTypes.array,
  }).isRequired,
};

export default FollowButton;
