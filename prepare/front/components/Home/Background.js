import React, { useState } from 'react';
import styled from 'styled-components';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Image from 'next/image';
import { backgroundImages, getRandomIndex } from '../../utils/index';
import BackgroundContent from './BackgroundContent';

const BackgroundContainer = styled.section`
  width: 100%;
  height: 80vh;
  position: relative;
`;

const ImageWrapper = styled.div`
  height: 100%;
  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  & div {
    &:nth-child(${(props) => props.index + 1}) {
      background: white;
    }
  }
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 100%;
  border: 1px solid white;
  background: none;
  cursor: pointer;
  margin: 0 3px;
`;

const LeftSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);
    & svg {
      color: #383838;
    }
  }
  @media screen and (max-width: 450px) {
    left: 10px;
  }
`;

const RightSlideButton = styled.div`
  width: 34px;
  height: 34px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100%;
  background: none;
  & svg {
    color: white;
  }
  &:hover {
    background: rgba(220, 220, 220, 0.9);
    & svg {
      color: #383838;
    }
  }
  @media screen and (max-width: 450px) {
    right: 10px;
  }
`;

const randomIndex = getRandomIndex(3);

const HomeBackground = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(randomIndex);

  const handleDotClick = (index) => {
    setBackgroundIndex(index);
  };

  const rightSlide = () => {
    if (backgroundIndex === backgroundImages.length - 1) {
      setBackgroundIndex(0);
    } else {
      setBackgroundIndex((prev) => prev + 1);
    }
  };

  const leftSlide = () => {
    if (backgroundIndex === 0) {
      setBackgroundIndex(backgroundImages.length - 1);
    } else {
      setBackgroundIndex((prev) => prev - 1);
    }
  };

  return (
    <BackgroundContainer>
      <ImageWrapper>
        <Image src={backgroundImages[backgroundIndex]} alt="main" layout="fill" />
      </ImageWrapper>
      <DotWrapper index={backgroundIndex}>
        {backgroundImages.map((bg, idx) => (
          <Dot key={bg} onClick={() => handleDotClick(idx)} />
        ))}
      </DotWrapper>
      <BackgroundContent />
      <LeftSlideButton onClick={leftSlide}>
        <BiChevronLeft size={30} />
      </LeftSlideButton>
      <RightSlideButton onClick={rightSlide}>
        <BiChevronRight size={30} />
      </RightSlideButton>
    </BackgroundContainer>
  );
};

export default HomeBackground;
