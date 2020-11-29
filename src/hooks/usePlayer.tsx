import React, { useEffect, useContext, createContext } from 'react'
import { useImmer } from "use-immer";
import { getStoredPlayer, storePlayer } from '../utils/localStorage';



export interface PlayerContextInterface extends PlayerInterface {
  setNickname: (nickname: string) => void;
  setBestScore: (bestScore: number) => void;
}

const PlayerContext = createContext({} as PlayerContextInterface);

export interface PlayerInterface {
  nickname: string;
  bestScore: number;
}

interface PlayerProviderProps {
  children: React.ReactNode
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [player, updatePlayer] = useImmer<PlayerInterface>({
    nickname: '', 
    bestScore: 0
  });

  const setNickname = (nickname: string) => {
    updatePlayer(draft => {
      draft.nickname = nickname;
    })
  }
  const setBestScore = (bestScore: number) => {
    updatePlayer(draft => {
      draft.bestScore = bestScore;
    })
  }

  // useEffect(() => {
  //   const {nickname, bestScore} = getStoredPlayer()
  //   if (nickname) {
  //     setNickname(nickname)
  //   }
  //   if(bestScore) {
  //     setBestScore(bestScore)
  //   }
  // }, [])

  useEffect(() => {
    storePlayer({nickname: player.nickname, bestScore: player.bestScore})
  }, [player.nickname, player.bestScore])

  return (
    <PlayerContext.Provider
      value={{
        nickname: player.nickname, 
        bestScore: player.bestScore,
        setNickname,
        setBestScore
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)