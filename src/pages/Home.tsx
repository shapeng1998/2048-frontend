import React from 'react';
import {Link} from "react-router-dom";
import styled from '@emotion/styled';

import LeaderBoard from '../components/LeaderBoard'



import {usePlayer} from '../hooks/usePlayer'
import {useGame} from '../hooks/useGame'



function Home() {
  const {nickname, setNickname, bestScore} = usePlayer()
  const {difficulty} = useGame()

  return(
    <HomePage>
      <UserPage>
        <Heading>2048</Heading>
        <BestScore>Best score: {bestScore}</BestScore>
        <NicknameLabel htmlFor="nickname-input">Your nickname:</NicknameLabel>
        <NicknameInput value={nickname} onChange={e => setNickname(e.target.value)} id='nickname-input' />

        <Menu>
          <MenuOption color='green'>
            <Link to="/singleplayer">Singleplayer</Link>
          </MenuOption>
          <MenuOption color='blue'>
            <Link to="/multiplayer">Multiplayer</Link>
          </MenuOption>
        </Menu>
      </UserPage>

 

      <Leaderboard>
        <LeaderboardHeading>积分排行榜</LeaderboardHeading>
        <LeaderBoard/>
      </Leaderboard>

    </HomePage>
    
  )
}

export default Home

const LeaderboardHeading = styled.div`
  font-size: 2rem;
  margin: 0 0 1rem 0;
  @media (min-width: 480px) {
    font-size: 2rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`

const Leaderboard = styled.div`
  display: flex;
  margin: 3rem 5rem 1rem 10rem;
  flex-direction: column;
  font-size: 4rem;
  
  align-items: center;
  justify-content: space-between;
  @media (min-width: 480px) {
    font-size: 5rem;
  }
`

const UserPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem 1rem 5rem;
  justify-content: space-between;
  align-items: center;
`

const HomePage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Heading = styled.div`
  font-size: 5rem;
  margin: 0 0 1rem 0;
  @media (min-width: 480px) {
    font-size: 6rem;
  }
  @media (min-width: 768px) {
    font-size: 7rem;
  }
  @media (min-width: 1024px) {
    font-size: 6rem;
  }
`

const BestScore = styled.p`
  margin: 1em auto;
  text-align: center;
  font-size: 1.25rem;
`

const NicknameLabel = styled.label`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 1.25rem;
  @media (min-width: 480px) {
    font-size: 1.5rem;
  }
  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`

const NicknameInput = styled.input`
  background: #eee4da;
  color: #776e65;
  border-radius: 1rem;
  border: none;
  font-size: 1.5rem;
  margin: .25em 0;
  padding: .25em .25em;
  text-align: center;
  @media (min-width: 480px) {
    font-size: 1.75rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
`

export const Menu = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  `

type MenuOptionProps = {
  color: string
}

export const MenuOption = styled.li`
  width: 70%;
  font-size: 1.5rem;
  margin: .6em 0;
  border-radius: 1em;
  background: ${(props: MenuOptionProps) => `var(--${props.color})`};
  
  & > * {
    font-size: 1.5rem;
    margin: 0;
    width: 100%;
    font-weight: 600;
    display: block;
    text-align: center;
    color: #e1eef6;
    letter-spacing: 1px;
    padding: .5em 0;
    cursor: pointer;
    border-radius: 1em;
    background: ${(props: MenuOptionProps) => `var(--${props.color})`};
  }

  @media (min-width: 480px) {
    font-size: 1.75rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.75rem;
  }
`
