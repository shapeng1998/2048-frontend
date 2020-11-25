import React from 'react'
import {Link} from "react-router-dom";
import styled from '@emotion/styled'

import { Menu, MenuOption } from '../pages/Home';

export const Lobby = () => {
    return (
      <PageContainer>
      <MagnifyingGlassOverlay>
        <MagnifyingGlassCircle />
        <MagnifyingGlassHandle />
      </MagnifyingGlassOverlay>
      <LobbyText>Looking for an opponent</LobbyText>
      <Menu>
        <MenuOption color='red'>
          <Link to="/">Exit</Link>
        </MenuOption>
      </Menu>
      </PageContainer>
    );
}

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const MagnifyingGlassOverlay = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
`;

const MagnifyingGlassCircle = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 10px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

const MagnifyingGlassHandle = styled.div`
  margin-left: -3px;
  width: 60px;
  height: 12px;
  background:rgba(195, 195, 195, 0.6);
  border-top-right-radius: 30%;
  border-bottom-right-radius: 30%;
`
const LobbyText = styled.p`
  font-size: 1.5rem;
`