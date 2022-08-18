import React, { useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeContext } from '../pages/_app';

const StyledAnchor = styled.a`
  color: ${({ theme }) => theme.mainColor};
`;

const PostCardContent = ({ postData }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, idx) => {
        if (v.match(/(#[^\s]+)/)) {
          return (
            <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={idx}>
              <StyledAnchor theme={theme}>{v}</StyledAnchor>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
