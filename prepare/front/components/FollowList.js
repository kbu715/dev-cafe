import { Button, Card, List } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';

const FollowList = ({ header, data }) => {
  const listStyle = useMemo(() => ({ marginBottom: '20px' }));
  const loadMoreStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }));
  const listItemStyle = useMemo(() => ({ marginTop: '20px' }));

  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <List
      style={listStyle}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={loadMoreStyle}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={listItemStyle}>
          <Card actions={[<MinusCircleOutlined key="minus" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
