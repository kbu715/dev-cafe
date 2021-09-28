import React, { useState, useCallback, useContext } from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, RETWEET_REQUEST, UNLIKE_POST_REQUEST } from '../reducers/post';
import { ThemeContext } from '../pages/_app';

moment.locale('ko');

const Global = createGlobalStyle`
    .ant-list {
      color: ${(props) => props.theme.text};
      background: ${(props) => props.theme.itemBackground};
    }
    .ant-comment-content-author-name {
      color: ${(props) => props.theme.text};
      background: ${(props) => props.theme.itemBackground};
    }
    .ant-empty-description {
      color: ${(props) => props.theme.text};
    }
`;

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  background: ${(props) => props.theme.itemBackground};
  color: ${(props) => props.theme.text};
  & .ant-card-head,
  & .ant-card-body,
  & .ant-card-actions,
  & .ant-card-meta-title,
  & .ant-card-meta-description {
    background: ${(props) => props.theme.itemBackground};
    color: ${(props) => props.theme.text};
  }

  & .ant-card-actions svg {
    color: ${(props) => props.theme.text};
  }

  & strong {
    color: ${(props) => props.theme.text};
  }
`;

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { removePostLoading } = useSelector((state) => state.post);
  const id = me?.id;

  const dispatch = useDispatch();

  const onLike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onUnlike = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      alert('로그인이 필요합니다.');
    }
    dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((liker) => liker.id === id);

  const { theme } = useContext(ThemeContext);

  return (
    <CardWrapper key={post.id}>
      <Global theme={theme} />
      <StyledCard
        theme={theme}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked ? (
            <span>
              <HeartTwoTone twoToneColor={theme.mainColor} key="heart" onClick={onUnlike} style={{ marginRight: '5px' }} />
              <strong>{post.Likers.length}</strong>
            </span>
          ) : (
            <span>
              <HeartOutlined key="heart" onClick={onLike} style={{ marginRight: '5px' }} />
              <strong>{post.Likers.length}</strong>
            </span>
          ),

          <span>
            <MessageOutlined key="message" onClick={onToggleComment} style={{ marginRight: '5px' }} />
            <strong>{post.Comments.length}</strong>
          </span>,
          id && post.User.id === id ? (
            <Popover
              key="ellipsis"
              content={
                <Button.Group>
                  <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>
                    삭제
                  </Button>
                </Button.Group>
              }
            >
              <EllipsisOutlined />
            </Popover>
          ) : null,
        ]}
        title={post.RetweetId ? `${post.User.nickname}님이 이 글을 끌어 올렸습니다.` : null}
      >
        {post.RetweetId && post.Retweet ? (
          <StyledCard cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: 'right' }}>{moment(post.createdAt).startOf('day').fromNow()}</div>
            <StyledCard.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </StyledCard>
        ) : (
          <>
            <div style={{ float: 'right' }}>{moment(post.createdAt).startOf('hour').fromNow()}</div>
            <StyledCard.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </StyledCard>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;
