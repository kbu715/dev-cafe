import React, { useContext } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../pages/_app';
import { EMAIL, GFOOTER_Z_INDEX } from '../../utils/constant';

const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${GFOOTER_Z_INDEX};
`;

const ContactWrapper = styled.div`
  width: 250px;
  height: 150px;
  border-radius: 8px;
  background: ${(props) => props.theme.itemBackground};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ModalHeader = styled.header`
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
`;

const ModalContent = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & div {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const ContactModal = ({ trigger }) => {
  const { theme } = useContext(ThemeContext);
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      trigger();
    }
  };

  return (
    <ModalContainer onClick={onMaskClick}>
      <ContactWrapper theme={theme}>
        <ModalHeader>
          <span>Contact</span>
        </ModalHeader>
        <ModalContent>
          <AiOutlineMail size={20} />
          <div>
            <address>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </address>
          </div>
        </ModalContent>
      </ContactWrapper>
    </ModalContainer>
  );
};

ContactModal.propTypes = {
  trigger: PropTypes.func.isRequired,
};

export default ContactModal;
