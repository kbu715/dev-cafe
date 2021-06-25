import { Button, Card, List } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => {
  const listStyle = useMemo(() => ({ marginBottom: '20px' }));
  const loadMoreStyle = useMemo(() => ({ textAlign: 'center', margin: '10px 0' }));
  const listItemStyle = useMemo(() => ({ marginTop: '20px' }));

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
          <Card actions={[<MinusCircleOutlined key="minus" />]}>
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
