import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineGithub, AiOutlineMail } from 'react-icons/ai';
import { lightTheme } from '../../theme';
import { ThemeContext } from '../../pages/_app';
import ContactModal from './ContactModal';

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid ${(props) => (props.theme === lightTheme ? '#bfbac5cc' : '#7b7b7b')};
  padding: 0 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLogoWrapper = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Comfortaa', cursive;
  margin-right: 5px;
  color: ${(props) => (props.theme === lightTheme ? '#a0a0a0' : '#7b7b7b')};

  &:hover {
    color: ${(props) => (props.theme === lightTheme ? '#363537' : '#fafafa')};
  }
`;

const FooterIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & svg {
    color: ${(props) => (props.theme === lightTheme ? '#a0a0a0' : '#7b7b7b')};
    &:hover {
      color: ${(props) => (props.theme === lightTheme ? '#363537' : '#fafafa')};
    }
  }
`;

const Icon = styled.div`
  margin: 0 10px;
  cursor: pointer;
`;

const GlobalFooter = () => {
  const [contact, setContact] = useState(false);
  const { theme } = useContext(ThemeContext);

  const contactTrigger = () => setContact((prev) => !prev);
  return (
    <>
      <Footer theme={theme}>
        {/* TODO: 나중에 로고로 바꿀까? */}
        <FooterLogoWrapper theme={theme}>Dev-Cafe</FooterLogoWrapper>
        <FooterIconWrapper theme={theme}>
          <Icon>
            <AiOutlineGithub size={28} onClick={() => window.open(`https://github.com/kbu715`, '_blank')} />
          </Icon>
          <Icon>
            <AiOutlineMail size={28} onClick={contactTrigger} />
          </Icon>
        </FooterIconWrapper>
      </Footer>
      {contact && <ContactModal trigger={contactTrigger} />}
    </>
  );
};

export default GlobalFooter;
