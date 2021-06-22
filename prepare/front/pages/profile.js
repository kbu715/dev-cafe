import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';

import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [{ nickname: '짜장면' }, { nickname: '탕수육' }, { nickname: '팔보채' }];
  const followingList = [{ nickname: '짬뽕' }, { nickname: '깐풍기' }, { nickname: '볶음밥' }];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | Nodebird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
