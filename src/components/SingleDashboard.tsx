import React from 'react'
import styled from '@emotion/styled';

import {useGame} from '../hooks/useGame'
import { usePlayer } from '../hooks/usePlayer';

function SingleDashboard () {
  const {score, undoMove, resetGame} = useGame()
  const {bestScore, setBestScore} = usePlayer()

  if (score > bestScore) setBestScore(score)

  return (
    <DashboardContainer>
      <ScoreGroup>
        <Score>
          <h3>Best:</h3>
          <p>
            {
              bestScore 
                ? bestScore >= score
                  ? bestScore
                  : score
                : score 
            }
          </p>
        </Score>
        <Score>
          <h3>Score:</h3>
          <p>{score}</p>
        </Score>
      </ScoreGroup>
      <ButtonsGroup>
        <Button onClick={resetGame}>New game</Button>
        <Button onClick={undoMove}>Undo</Button>
      </ButtonsGroup>
    </DashboardContainer>
  );
}

export default SingleDashboard

const DashboardContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`

const ScoreGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Score = styled.div`
  width: 45%;
  text-align: center;
  background: #ede0c8;
  color: #776e65;
  border-radius: .5em;
  h3 {
    font-size: 1.25rem;
    margin: .5em 0;
  }
  p {
    font-size: 1.1rem;
    margin: .5em 0;
  }
`

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Button = styled.button`
  font-size: 1.5rem;
  margin: .5em 0;
  width: 40%;
  padding: .25em 0;
  background: #eee4da;
  color: #776e65;
  border-radius: .5em;
`