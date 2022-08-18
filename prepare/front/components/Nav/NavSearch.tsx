import React, { useContext, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { ThemeContext } from '../../pages/_app';
import { lightTheme } from '../../theme';
import useInput from '../../hooks/useInput';

const SearchBarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 350px;
  position: relative;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

const SearchBar = styled.input`
  padding: 5px 10px;
  border-radius: 15px;
  border: 1px solid white;
  width: 100%;
  background: none;
  color: white;

  ${(props) =>
    props.show &&
    css`
      background: ${({ theme }) => (theme === lightTheme ? '#f5f5f5' : '#252424')};
      color: ${props.theme.text};
      border: 1px solid ${({ theme }) => (theme === lightTheme ? '#bfbac5cc' : '#7b7b7b')};
    `};

  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: 13px;
    text-align: center;
  }

  @media screen and (max-width: 450px) {
    &::placeholder {
      color: transparent;
    }
  }
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  & svg {
    color: white;
    ${(props) =>
      props.show &&
      css`
        color: ${({ theme }) => (theme === lightTheme ? '#949494' : '#828282')};
      `};
  }
`;

const NavSearch = ({ show }) => {
  const { theme } = useContext(ThemeContext);
  const [keyword, onChangeKeyword, setKeyword] = useInput('');

  const onClick = useCallback(() => {
    if (keyword) {
      Router.push(`/hashtag/${keyword}`);
      setKeyword('');
    }
  }, [keyword]);

  const onEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (keyword) {
          Router.push(`/hashtag/${keyword}`);
          setKeyword('');
        }
      }
    },
    [keyword],
  );

  return (
    <SearchBarWrapper>
      <SearchBox>
        {show ? (
          <SearchBar type="text" value={keyword} onKeyPress={onEnter} onChange={onChangeKeyword} placeholder="keyword" theme={theme} show={show} />
        ) : (
          <SearchBar type="text" value={keyword} onKeyPress={onEnter} onChange={onChangeKeyword} theme={theme} show={show} maxLength="17" />
        )}
        <SearchButton show={show} theme={theme} onClick={onClick}>
          <AiOutlineSearch size={20} />
        </SearchButton>
      </SearchBox>
    </SearchBarWrapper>
  );
};

NavSearch.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default NavSearch;
