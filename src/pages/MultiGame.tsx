import React, { useState,useEffect, useRef } from 'react';
import io from 'socket.io-client'
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router"
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button';


import PlayerBoard from '../components/PlayerBoard'
import MultiDashboard from '../components/MultiDashboard'
import { Lobby } from '../components/Lobby';
import { useGame } from '../hooks/useGame';
import {usePlayer} from '../hooks/usePlayer'
import GameResult from '../components/GameResult';
import {startMultiplayerI, updateMultiplayerI} from '../types/useGame.types'
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';


const MultiGame: React.FC<RouteComponentProps> = () => {
  const { board, score, setInitials,startGameReady, startMultiplayer, updateMultiplayer, resultMultiplayer, gameId, gameResult, handleGameEvent, decreasePoints, handleOpponentLost} = useGame()
  const {nickname} = usePlayer()
  const socket = useRef({} as SocketIOClient.Socket)
  
  //const SERVER_ENDPOINT: string | undefined = process.env.REACT_APP_SERVER_ENDPOINT
  const SERVER_ENDPOINT = '47.101.139.249:3000';
  useEffect(() => {
    if(!SERVER_ENDPOINT) return
    socket.current = io.connect(SERVER_ENDPOINT)
    socket.current.emit('join', { nickname }, (error: any) => {
      if (error) {
        window.alert(error)
      }
    })
   
    socket.current.on('game-ready', () => startGameReady())
    socket.current.on('ready-move', ({opponentBoard, opponentScore}: updateMultiplayerI) => {updateMultiplayer({opponentBoard, opponentScore})})

    socket.current.on('start-game', ({gameId, gameTime}: startMultiplayerI) => startMultiplayer({gameId, gameTime}))
    socket.current.on('move', ({opponentBoard, opponentScore}: updateMultiplayerI) => {updateMultiplayer({opponentBoard, opponentScore})})
    socket.current.on('game-event', ({type}: {type: string}) => handleGameEvent(type))
    socket.current.on('end-game', () => resultMultiplayer())
    socket.current.on('opponent-lost', () => handleOpponentLost())
    socket.current.on('opponent-exit', () => resultMultiplayer())
    socket.current.on('game-mul-start-no-enough-people', () => window.alert("人数不足，无法开始游戏"))
    socket.current.on('email-data', ({nickname,message}:{nickname:string,message:string}) => enqueueSnackbar(nickname+":"+message))

    window.alert("现在是游戏准备阶段，可以随意试玩，玩家到齐后，点击开始，游戏开始")
    return () => {
      socket.current.disconnect()
      setInitials()
    };
  }, [])


  useEffect(() => {
    if(gameId) {
      socket.current.emit('move', {board, score })
    }
    else
    {
      socket.current.emit('ready-move', {board})
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

  const mulGanmeStart = () => {
    if(!gameId)
    {
      socket.current.emit('game-mul-start')
    }
    else
    {
      window.alert("游戏已经开始了，请认真游戏")
    }
    
  }



  const [message,setMessage]=useState("")


  const saveMessage = (words : string) =>{
    setMessage(words)
    console.log(message)
  }

  const sendEmail = () => {
    console.log(message)
    socket.current.emit('email-data',{nickname,message})
    setMessage("")
  }

  const clearMessage = () => {
    setMessage("")
  }
  const playAgain = () => {
    window.location.reload(false);
  }

  const { enqueueSnackbar } = useSnackbar();

  
  return(
    <>
            <MultiGameContainer>
              <MultiDashboard startMulGame={() => mulGanmeStart()} emitBomb={() => emitGameEvent('bomb', 250)} emitFreeze={() => emitGameEvent('freeze', 750)} />
              <PlayerBoard />
            </MultiGameContainer>

            <WechatBoard>
              <NicknameLabel >Your message:</NicknameLabel>
              <NicknameInput value={message} onChange={e => saveMessage(e.target.value)} id='nickname-input' />
              <Button onClick={() => { sendEmail() }} >Send</Button>
              <Button onClick={() => { clearMessage() }} >Clear</Button>
            </WechatBoard>
            {
              gameResult && <GameResult gameResult={gameResult} playAgain={playAgain} />
            }
    </>
  )
}

export default withRouter(MultiGame)

const MultiGameContainer = styled.div`
  width: 200%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

`

const WechatBoard = styled.div`
  width: 30%;
  height: 20%;
  display: flex;
  flex-direction: column;
  margin: 35em 0em 1.25em ;
  justify-content: space-evenly;

`

const NicknameLabel = styled.label`
  display: block;
  margin: 0 auto;
  text-align: center;
  font-size: 1rem;
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
  font-size: 1rem;
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