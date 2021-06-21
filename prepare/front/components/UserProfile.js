import { Avatar, Card, Button } from 'antd';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const dummy = {
  nickname: '방루이',
  Posts: [],
  Followings: [],
  Followers: [],
  isLoggedIn: false,
};

const UserProfile = ({ setIsLoggedIn }) => {
  const onLogOut = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />
          {dummy.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {dummy.Followings.length}
        </div>,
        <div key="follower">
          팔로워
          <br />
          {dummy.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{dummy.nickname[0]}</Avatar>} title={dummy.nickname} />
      <Button onClick={onLogOut}>로그아웃</Button>
    </Card>
  );
};

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default UserProfile;
