import React from 'react'
import styled from '@emotion/styled'
import Settings from './Settings'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout ({children}: LayoutProps) {
  return (
    <LayoutConteiner>
      <Settings/>
      <ChildrenConteiner>
        {children}
      </ChildrenConteiner> 
    </LayoutConteiner>
  )
}

const LayoutConteiner = styled.div`
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ChildrenConteiner = styled.div`
  width: 100vw;
  height: calc(100vh - 2rem);
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 480px) {
    height: calc(100vh - 2.5rem);
    margin-top: 2.5rem;
    max-width: 400px;
  }

  @media (min-width: 768px) and (orientation: portrait) {
    max-width: 650px;
  }

  @media (min-width: 1024px) {
    max-width: 350px;
  }

  @media (min-width: 1480px) {
    max-width: 600px;
  }
`