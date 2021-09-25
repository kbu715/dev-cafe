import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import { Overlay, Header, CloseBtn, SlickWrapper, ImgWrapper, Global } from './styles';
import { ThemeContext } from '../../pages/_app';

const ImagesZoom = ({ images, onClose, more }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Overlay>
      <Global />
      <Header theme={theme}>
        <h1>🌈{more && `${images.length}장의 사진`}</h1>
        <CloseBtn onClick={onClose} theme={theme} />
      </Header>
      <SlickWrapper>
        <Slick initialSlide={0} infinite arrows={false} slidesToShow={1} slidesToScroll={1}>
          {images.map((v) => (
            <ImgWrapper key={v.src}>
              <img src={`${v.src}`} alt={v.src} />
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
  more: PropTypes.bool,
};

export default ImagesZoom;
