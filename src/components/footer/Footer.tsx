// @flow 
import * as React from 'react';
import styled from "styled-components";
import {theme} from "../../_globalStyles/theme";

const media = {
  inst: 'instagram',
  tg: 'telegram'
};

type Props = {};

export const Footer = (props: Props) => {
  return (
    <StyledFooter>
      <div>
        <SocialMedia>
          <a href="https://www.instagram.com/vyacheslavna.brand?igsh=MTN3aHE4NjBoM3R6aQ==" target="_blank" rel="noopener noreferrer">
            <span>{media.inst.toUpperCase()} </span>
          </a>
          <a href="https://t.me/vyacheslavnabrand" target="_blank" rel="noopener noreferrer">
            <span>{media.tg.toUpperCase()}</span>
          </a>
        </SocialMedia>

        <RightAligned>
          <small className="made-by">
            Made by <StyledLink href="https://t.me/cvcvrs" target="_blank" rel="noopener noreferrer">
              j.erotique 
            </StyledLink> 
			<span> & </span>  
            <StyledLink href="https://www.instagram.com/iskandar0_o?igsh=MWpybXJleWg3cW9teQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
              isko
            </StyledLink>
          </small>
          <small className="brand">© 2023 VYACHESLÁVNA BRAND</small>
        </RightAligned>
      </div>
    </StyledFooter>
  );
};

const StyledLink = styled.a`
  text-decoration: none; 
  color: inherit; 
  cursor: pointer;
`;

const RightAligned = styled.div`
  font-size: calc(0.7vw + 10px);
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  text-align: right; 

  small {
    font-family: 'NEXT ART', sans-serif;

    &.brand {
      display: block;
    }
  }

  @media (max-width: 768px) {
    small.made-by {
      font-family: 'Fira Mono', monospace; 
      font-size: calc(1.8vw + 5px);
      margin-bottom: 10px;
    }

    small.brand {
      display: none;
    }
  }
`;

const StyledFooter = styled.footer`
  font-family: 'NEXT ART', sans-serif !important;
  font-weight: 500;
  line-height: 1.5;
  padding-top: 2vw;
  padding-bottom: 38px;
  font-size: calc(0.8vw + 5px);
  margin-top: auto;

  min-height: 153px;
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    justify-content: space-around;
    width: 92.6%;
    border-bottom: thin solid ${theme.underlining};
  }

  @media (max-width: 768px) {
    & > div {
      border-bottom: none;
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  font-size: calc(0.5vw + 10px);
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 20px;
  text-align: left; 
  
  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: auto; 
    font-size: calc(1.4vw + 5px);
    gap: 1px;
    color: grey;
  }
`;