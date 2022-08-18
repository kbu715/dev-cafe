import React, { useContext, useEffect, useState } from 'react';
import { FaLongArrowAltUp } from 'react-icons/fa';
import styled from 'styled-components';
import { ThemeContext } from '../../pages/_app';
import { SCROLLTOTOPBTN_Z_INDEX_ACTIVE, SCROLLTOTOPBTN_Z_INDEX_INACTIVE } from '../../utils/constant';

const ScrollTopBtn = styled.button`
  position: fixed;
  opacity: ${({ btnStatus }) => (btnStatus ? 1 : 0)};
  bottom: 80px;
  right: 40px;
  z-index: ${({ btnStatus }) => (btnStatus ? SCROLLTOTOPBTN_Z_INDEX_ACTIVE : SCROLLTOTOPBTN_Z_INDEX_INACTIVE)};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: ${({ theme }) => theme.itemBackground};
  color: ${({ theme }) => theme.mainColor};
  border: 2px solid ${({ theme }) => theme.mainColor};
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.06em;
  cursor: pointer;
  transition: opacity 0.3s ease-in;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }

  @media screen and (max-width: 450px) {
    bottom: 50px;
    right: 20px;
  }
`;

const ScrollToTopButton = () => {
  const { theme } = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);
  const [btnStatus, setBtnStatus] = useState(false);

  const handleScrollBtn = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 2000) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleScrollBtn);
    };
    watch();
    return () => {
      window.removeEventListener('scroll', handleScrollBtn);
    };
  });

  return (
    <ScrollTopBtn btnStatus={btnStatus} onClick={scrollToTop} theme={theme}>
      <FaLongArrowAltUp />
    </ScrollTopBtn>
  );
};

export default ScrollToTopButton;
