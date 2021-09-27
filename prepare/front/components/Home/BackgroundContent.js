import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 10%;
  top: 70%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    left: 50%;
    top: 70%;
    transform: translateX(-50%);
  }
`;

const Content = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fafafa;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 450px) {
    width: max-content;
    font-size: 1.2rem;
  }
`;

const HomeBackgroundContent = () => {
  return (
    <Container>
      <Content>
        <span>디지털 노마드를 꿈꾸며</span>
        <span>개발자 여러분들의 최애 카페를</span>
        <span>소개해주세요</span>
      </Content>
    </Container>
  );
};

export default HomeBackgroundContent;
