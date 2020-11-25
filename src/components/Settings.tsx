import React, { useState } from 'react';
import {Link} from "react-router-dom";
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import {AiOutlineSetting} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'

import { Overlay, PopUp } from './GameResult';
import { Menu, MenuOption } from '../pages/Home';

function Settings() {
  const [isVisible, setIsVisible] = useState(false)
  
  return(
    <>
      <SettingsButton isVisible={isVisible} onClick={() => setIsVisible(true)}>
        {
          !isVisible && <AiOutlineSetting />
        }
      </SettingsButton>
      {
        isVisible && (
          <Overlay>
            <PopUp>
              <HideSettingsBtn onClick={() => setIsVisible(false)}>
                <ImCross />
              </HideSettingsBtn>
              <h1>Settings</h1>
              <Menu>
                <MenuOption color='red'>
                  <Link to='/' onClick={() => setIsVisible(false)}>Go to menu</Link>
                </MenuOption>
              </Menu>
            </PopUp>
          </Overlay>
        )
      }
    </>
  )
}

export default Settings

const HideSettingsBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1.25em;
  height: 1.25rem;
  width: 1.25rem;
  padding: 0;
  color: red;
  background: transparent;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  @media (min-width: 480px) {
    height: 1.5rem;
    width: 1.5rem;
  }
`


type SettingsButtonProps = {
  isVisible: boolean;
}

const visibleSettings = css`
  background: transparent;
  svg {
    fill: #fff;
  }
`

const nonVisibleSettings = css`
  svg {
    fill: #776e65;
  }
`

const SettingsButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: .25rem;
  width: 2rem;
  height: 2rem;
  z-index: 100;
  outline: none;
  cursor: pointer;
  background: transparent;

  svg {
    width: 100%;
    height: 100%;
  }

  ${({isVisible}: SettingsButtonProps) => isVisible ? visibleSettings : nonVisibleSettings}

  @media (min-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`


