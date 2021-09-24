import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import ImagesZoom from './ImagesZoom';

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const MoreButton = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
`;

const StyledImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <ImagesContainer>
        <StyledImage role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </ImagesContainer>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <ImagesContainer>
          <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} width="50%" onClick={onZoom} />
          <img role="presentation" src={`http://localhost:3065/${images[1].src}`} alt={images[1].src} width="50%" onClick={onZoom} />
        </ImagesContainer>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} more />}
      </>
    );
  }
  return (
    <>
      <ImagesContainer>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} width="50%" onClick={onZoom} />
        <MoreButton role="presentation" onClick={onZoom}>
          <FiMoreVertical />
          <br />
          더보기
        </MoreButton>
      </ImagesContainer>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} more />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
};

export default PostImages;
