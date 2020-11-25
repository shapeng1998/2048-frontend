import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client'
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router"
import styled from '@emotion/styled'


import PlayerBoard from '../components/PlayerBoard'
import MultiDashboard from '../components/MultiDashboard'
import { Lobby } from '../components/Lobby';
import { useGame } from '../hooks/useGame';
import {usePlayer} from '../hooks/usePlayer'
import GameResult from '../components/GameResult';
import {startMultiplayerI, updateMultiplayerI} from '../types/useGame.types'

const MultiGame: React.FC<RouteComponentProps> = () => {
  const { board, score, setInitials, startMultiplayer, updateMultiplayer, resultMultiplayer, gameId, gameResult, handleGameEvent, decreasePoints, handleOpponentLost} = useGame()
  const {nickname} = usePlayer()
  const socket = useRef({} as SocketIOClient.Socket)
  
  const SERVER_ENDPOINT: string | undefined = process.env.REACT_APP_SERVER_ENDPOINT
  
  useEffect(() => {

    if(!SERVER_ENDPOINT) return
    socket.current = io.connect(SERVER_ENDPOINT)
    socket.current.emit('join', { nickname }, (error: any) => {
      if (error) {
        window.alert(error)
      }
    })

    socket.current.on('start-game', ({gameId, gameTime}: startMultiplayerI) => startMultiplayer({gameId, gameTime}))
    socket.current.on('move', ({opponentBoard, opponentScore}: updateMultiplayerI) => {updateMultiplayer({opponentBoard, opponentScore})})
    socket.current.on('game-event', ({type}: {type: string}) => handleGameEvent(type))
    socket.current.on('end-game', () => resultMultiplayer())
    socket.current.on('opponent-lost', () => handleOpponentLost())
    socket.current.on('opponent-exit', () => resultMultiplayer())

    return () => {
      socket.current.disconnect()
      setInitials()
    };
  }, [])


  useEffect(() => {
    if(gameId) {
      socket.current.emit('move', {board, score })
    }
  }, [gameId, board, score])

  if(gameResult) {
    if (gameResult === 'defeat') socket.current.emit('player-lost')
    socket.current.disconnect()
  }

  const emitGameEvent = (type: string, cost: number) => {
    socket.current.emit('game-event', { type })
    decreasePoints(cost)
  }

  const playAgain = () => {
    window.location.reload(false);
  }
  return(
    <>
      {
        gameId ? (
          <>
            <MultiGameContainer>
              <MultiDashboard emitBomb={() => emitGameEvent('bomb', 250)} emitFreeze={() => emitGameEvent('freeze', 750)} />
              <PlayerBoard />
            </MultiGameContainer>
            {
              gameResult && <GameResult gameResult={gameResult} playAgain={playAgain} />
            }
          </>
        ) : (
          <Lobby />
        )
      }
    </>
  )
}

export default withRouter(MultiGame)

const MultiGameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

`