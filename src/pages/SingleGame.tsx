import React, { useEffect } from 'react';
import styled from '@emotion/styled'

import GameResult from '../components/GameResult';
import Board from '../components/PlayerBoard'
import Dashboard from '../components/SingleDashboard'
import { useGame } from '../hooks/useGame';
import LeaderBoard from '../components/LeaderBoard'

function SingleGame() {
  const {setInitials, gameResult, startSingleplayer, resetGame} = useGame()
  

  useEffect(()=> {
    
    startSingleplayer()
    return () => setInitials()
  }, [])
  
  return(
    <SingleGameContainer>
      <Gameboard>
        <Dashboard />
        <Board />
        {
          gameResult && <GameResult gameResult={gameResult} playAgain={resetGame} />
        }
      </Gameboard>

      <Leaderboard>
        <LeaderboardHeading>积分排行榜</LeaderboardHeading>
        <LeaderBoard/>
      </Leaderboard>
    </SingleGameContainer>
  )
}

export default SingleGame



const LeaderboardHeading = styled.div`
  font-size: 3rem;
  margin: 0 0 .5rem 0;
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
const Gameboard = styled.div`
  display: flex;
  margin: 0rem 20rem 1rem 10rem;
  flex-direction: column;
  font-size: 100rem;
  
  align-items: center;
  justify-content: space-between;

`

const Leaderboard = styled.div`
  display: flex;
  margin: 20rem -10rem 1rem 0rem;
  flex-direction: column;
  font-size: 3rem;
  
  align-items: center;
  justify-content: space-between;
  @media (min-width: 480px) {
    font-size: 2rem;
  }
`

const SingleGameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

`