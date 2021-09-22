import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    function onScroll() {
      // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 400) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  // console.log(context);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; // ssr시 쿠키 공유문제 해결
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});

export default Home;

/*

  // ssr시 쿠키 공유문제 해결
  무조건 쿠키 일단 비워줘야 합니다.
  로그인되었을 경우 내 로그인 정보 쿠키를 서버로 보냅니다.

  // 정보
  브라우저가 요청을 보내는 경우에는 쿠키가 저절로 동봉되어 있습니다. 
  서버가 요청을 보내는 경우(프론트서버->백엔드서버)에는 
  직접 쿠키를 넣어주어야 합니다. getServerSideProps는 프론트서버에서 
  실행되는 코드라서 쿠키를 넣어주어야 합니다.

  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''; 
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
*/
