import {Directions} from './Directions'
import {Animation} from './Animations'
export type ACTIONTYPE = 
  | {type: 'START_SINGLEPLAYER';} 
  | {type: 'MAKE_MOVE'; direction: Directions;}
  | {type: 'UNDO';} 
  | {type: 'RESET';} 
  | {type: 'SET_INITIALS';}
  
  | {type: 'START_MULTIPLAYER', data: startMultiplayerI;}
  | {type: 'UPDATE_MULTIPLAYER', data: updateMultiplayerI;}
  | {type: 'RESULT_MULTIPLAYER';}
  | {type: 'BOMB_EVENT'}
  | {type: 'DECREASE_POINTS', cost: number;}
  | {type: 'TOGGLE_ISPLAYING'}
  | {type: 'OPPONENT_LOST'}
  | {type: 'SET_EASY'}
  | {type: 'SET_HARD'}
  | {type: 'GAME_READY'}
  | {type: 'START_MUL_GAME'}

export interface InitialStateInterFace {
  boardSize: number;
  gameType: undefined | 'singleplayer' | 'multiplayer'
  board: number[];
  isPlaying: boolean;
  previousBoard?: number[];
  gameResult: undefined | 'victory' | 'defeat' | 'draw';
  difficulty: undefined | 'easy' | 'hard' ;
  score: number;
  scoreIncrease?: number;
  id?: undefined;
  animations?: Animation[];
  
  //Multiplayer 
  gameId?: string;
  endTime?: number;
  opponentBoard?: number[];
  opponentScore?: number;
}

export interface startMultiplayerI {
  gameId: string; 
  gameTime: number;
}
export interface updateMultiplayerI {
  opponentBoard: number[]; 
  opponentScore: number
}
export interface GameContextInterface extends InitialStateInterFace {
  startSingleplayer: () => void;
  makeMove: (direction: Directions) => void;
  undoMove: () => void;
  resetGame: () => void;
  setInitials: () => void;
  startMultiplayer: (data: startMultiplayerI) => void;
  updateMultiplayer: (data: updateMultiplayerI) => void;
  resultMultiplayer: () => void;
  handleGameEvent: (eventType: string) => void;
  decreasePoints: (cost: number) => void
  handleOpponentLost: () => void;
  setEasy:() => void;
  setHard:() => void,
  startGameReady:() => void,
  startMulGame:()=> void
}