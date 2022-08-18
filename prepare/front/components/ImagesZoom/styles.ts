import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Global = createGlobalStyle`
  .slick-slide {
    display: inline-block;
  }
  .ant-card-cover {
    transform: none !important;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.header`
  height: 44px;
  background: ${({ theme }) => theme.body};
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
    color: ${({ theme }) => theme.text};
  }
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: rgba(0, 0, 0, 0.5);
  position: relative;

  & > div {
    height: 100%;
  }
`;

export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
  & svg {
    color: ${({ theme }) => theme.text} !important;
  }
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;
  position: relative;
  width: 100vw;
  height: 100vh;

  & img {
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 80vw;
    height: auto;
    max-height: 80vh;
    object-fit: contain;
  }
`;
