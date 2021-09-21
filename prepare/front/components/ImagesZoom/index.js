import React from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Global } from './styles';

const ImagesZoom = ({ images, onClose }) => {
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>🌈</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <Slick initialSlide={0} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
          {images.map((v) => (
            <ImgWrapper key={v.src}>
              <img src={`http://localhost:3065/${v.src}`} alt={v.src} />
            </ImgWrapper>
          ))}
        </Slick>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
