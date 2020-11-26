import React, { useContext, createContext } from 'react'
import { useImmerReducer } from "use-immer";

import {initializeBoard, updateBoard, movePossible,addHard} from '../utils/board'
import { getStoredBoard, storeBoard } from '../utils/localStorage';
import {InitialStateInterFace, GameContextInterface, ACTIONTYPE} from  '../types/useGame.types'
import axios from 'axios'
import { getStoredPlayer, storePlayer } from '../utils/localStorage';

const NANE_AND_ID = '2048.vs_board';

const GameContext = createContext({} as GameContextInterface);

const initialState: InitialStateInterFace = { 
  gameType: undefined,
  boardSize: 4,
  board: [],
  previousBoard: undefined,
  isPlaying: false,
  gameResult: undefined,
  score: 0,
  difficulty : "easy",
  id: undefined,
}

async function nicknameIsContain(url : string)
{
  const req = await axios.get(url)
  .then(response=> (


    localStorage.setItem(
      "ID",
      JSON.stringify({
        
        id: response.data
      })
    ),
    console.log(response.data)

  ));

}

function reducer(draft: typeof initialState, action: ACTIONTYPE) {
  const {nickname} = getStoredPlayer()



  switch(action.type) {
    case 'START_SINGLEPLAYER':
      draft.gameType = 'singleplayer'
      const storageData = getStoredBoard()
      if (storageData.board && storageData.score) {
        draft.board = storageData.board
        draft.score = storageData.score
        draft.isPlaying = true
        return
      }

      const initResult = initializeBoard(4)
      draft.board = initResult.board
      draft.isPlaying = true
      storeBoard({board: draft.board, score: draft.score})

      var url = "http://47.101.139.249:3000/api/players/"
      url = url + nickname

      console.log(url)

      nicknameIsContain(url);
      const rawData = JSON.parse(localStorage.getItem("ID") as string)
      console.log(rawData['id'])

      if(rawData['id']==null)
      {
        var jsons={  
          nickname:nickname,
          score:draft.score
          }
  
          axios.post("http://47.101.139.249:3000/api/players",jsons).then(response=> (
            localStorage.setItem(
              "ID",
              JSON.stringify({
                id: response.data
              })
            )
          ));
      }


      return

    case 'MAKE_MOVE':
      if(!draft.isPlaying) return

      draft.previousBoard = draft.board
      const moveResult = updateBoard(draft.board, action.direction)
      draft.board = moveResult.board
      draft.score += moveResult.scoreIncrease;
      draft.scoreIncrease = moveResult.scoreIncrease;
      if(draft.difficulty === 'hard')  draft.board = addHard(draft.board).board
      const isMovePossible = movePossible(draft.board) 
      if(isMovePossible === false) {
        draft.isPlaying = false
        draft.gameResult = 'defeat'
      }
      if(draft.gameType === 'singleplayer') storeBoard({board: draft.board, score: draft.score})


      //数据传输

    
    const rawData1 = JSON.parse(localStorage.getItem("ID") as string)
    console.log(111111111111)
    console.log(draft.score)
    console.log(rawData1["id"])
    console.log(111111111111)

    if(draft.score>rawData1["id"]["score"])
    {
      var jsons={  
        nickname:nickname,
        score:draft.score
      }
      url = "http://47.101.139.249:3000/api/players/" + rawData1["id"]["_id"]
      axios.patch(url,jsons);
    }


      return

    case 'UNDO':
      if(!draft.previousBoard) return
      if(!draft.isPlaying) return

      draft.board = draft.previousBoard;
      draft.previousBoard = undefined

      if (draft.scoreIncrease) draft.score -= draft.scoreIncrease;
      if(draft.gameType === 'singleplayer') storeBoard({board: draft.board, score: draft.score})
      return
    
    case 'RESET':
      draft.board = initializeBoard(4).board
      draft.previousBoard = undefined
      draft.score = 0 
      draft.gameResult = undefined
      if(draft.gameType === 'singleplayer') storeBoard({board: draft.board, score: 0})
      return
    case 'SET_INITIALS':
      draft.boardSize = 4
      draft.board = []
      draft.previousBoard = undefined
      draft.isPlaying = false
      draft.gameResult = undefined
      draft.score = 0
      if(draft.gameType === 'multiplayer') {
        draft.gameId = undefined
        draft.endTime = undefined
        draft.opponentBoard = undefined
        draft.opponentScore = undefined
      }
      draft.gameType = undefined
      return
      
    case 'START_MULTIPLAYER':
      draft.gameType = 'multiplayer'
      draft.board = initializeBoard(4).board
      const endTime = Date.now() + action.data.gameTime
      draft.endTime = endTime
      draft.gameId = action.data.gameId
      draft.previousBoard = undefined
      draft.score = 0
      draft.isPlaying = true
      return

    case 'UPDATE_MULTIPLAYER':
      draft.opponentBoard = action.data.opponentBoard
      draft.opponentScore = action.data.opponentScore
      return

    case 'RESULT_MULTIPLAYER':
      draft.isPlaying = false
      if(!draft.opponentScore && draft.opponentScore !== 0) return

      if(draft.score > draft.opponentScore) {
        draft.gameResult = 'victory'
      } else if (draft.score === draft.opponentScore) {
        draft.gameResult = 'draw'
      } else {
        draft.gameResult = 'defeat'
      }
      return

    case 'BOMB_EVENT':
      const occupiedIdxs: number[] = []
      draft.board.map((tile, idx) => tile > 0 && occupiedIdxs.push(idx))
      const randomIdx = occupiedIdxs[Math.round(Math.random() * occupiedIdxs.length) - 1]
      if(randomIdx) draft.board[randomIdx] = 0
      return

    case 'DECREASE_POINTS':
      draft.score -= action.cost
      return
    
    case 'TOGGLE_ISPLAYING':
      draft.isPlaying = !draft.isPlaying
      return
    case 'OPPONENT_LOST':
      if(!draft.isPlaying) return
      draft.gameResult = 'victory'
      draft.isPlaying = false
      return

    case 'SET_EASY':
      draft.difficulty = 'easy'
      
      return

    case 'SET_HARD':
      draft.difficulty = 'hard'
      
      return
  }
}

interface GameProviderProps {
  children: React.ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const {gameType, boardSize, board, gameResult, previousBoard, score, scoreIncrease, isPlaying, gameId, endTime, opponentBoard, opponentScore ,difficulty,id} = state


  const handleGameEvent = (eventType: string) => {
    switch (eventType) {
      case 'bomb':
        return dispatch({type: 'BOMB_EVENT'})
      
      case 'freeze':
        dispatch({type: 'TOGGLE_ISPLAYING'})
        setTimeout(() => {
          dispatch({type: 'TOGGLE_ISPLAYING'})
        }, 5000)
      return
    }
  }
  
  return (
    <GameContext.Provider
      value={{
        gameType,
        boardSize,
        board,
        previousBoard,
        score,
        gameResult,
        scoreIncrease,
        isPlaying,
        gameId, 
        endTime, 
        opponentBoard, 
        opponentScore,
        difficulty,
        id,
        startSingleplayer: () => dispatch({type: 'START_SINGLEPLAYER' }),
        makeMove: (direction) => dispatch({type: 'MAKE_MOVE', direction }),
        undoMove: () => dispatch({type: 'UNDO' }),
        resetGame: () => dispatch({type: 'RESET' }),

        setEasy:() => dispatch({type: 'SET_EASY' }),
        setHard:() => dispatch({type: 'SET_HARD' }),

        setInitials: () => dispatch({type: 'SET_INITIALS' }),
        startMultiplayer: (data) => dispatch({type: 'START_MULTIPLAYER', data }),
        updateMultiplayer: (data) => dispatch({type: 'UPDATE_MULTIPLAYER', data }),
        resultMultiplayer: () => dispatch({type: 'RESULT_MULTIPLAYER'}),
        handleGameEvent,
        decreasePoints: (cost) => dispatch({type: 'DECREASE_POINTS', cost }),
        handleOpponentLost: () => dispatch({type: 'OPPONENT_LOST'}),
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)