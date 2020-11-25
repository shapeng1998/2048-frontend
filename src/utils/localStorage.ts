import { StorageBoardModel, StoragePlayerModel } from '../types/Models';

const BOARD_NAME = '2048.vs_board';
const PLAYER_NAME = '2048.vs_player';

export function getStoredBoard(): StorageBoardModel {
  if (!localStorage.getItem(BOARD_NAME)) {
    return {};
  }

  let storedData: StorageBoardModel = {};
  try {
    const rawData = JSON.parse(localStorage.getItem(BOARD_NAME) as string);

  if(
    rawData.hasOwnProperty('board') &&
    rawData.hasOwnProperty('score') 
  ) {
    if (
      Array.isArray(rawData.board) &&
      typeof rawData.score === 'number'
    ) {
      for (let value of rawData.board) {
        if (typeof value !== 'number') {
          throw new Error('Invalid stored data');
        }

        // Make sure the value is a power of 2.
        if (value !== 0 && Math.log2(value) % 1 !== 0) {
          throw new Error('Invalid stored data');
        }
      }
      
      //Asign data to storedData obj
      storedData.board = rawData.board;
      storedData.score = rawData.score;
    } else {
      throw new Error('Invalid stored data');
    }
  }
  } catch(error) {
    console.error(`Error occured: ${error.message}. Stored data will be deleted.` )
    localStorage.removeItem(BOARD_NAME);
  }
  
  return storedData
}

export function storeBoard(data: StorageBoardModel) {
  localStorage.setItem(
    BOARD_NAME,
    JSON.stringify({
      score: data.score,
      board: data.board
    })
  );
}

export function getStoredPlayer(): StoragePlayerModel {
  if (!localStorage.getItem(PLAYER_NAME)) {
    return {};
  }

  let storedData: StoragePlayerModel = {};

  try {
    const rawData = JSON.parse(localStorage.getItem(PLAYER_NAME) as string);

  if(
    rawData.hasOwnProperty('nickname') &&
    rawData.hasOwnProperty('bestScore') 
  ) {
    if (
      typeof rawData.nickname === 'string' &&
      typeof rawData.bestScore === 'number'
    ) {      
      //Asign data to storedData obj
      storedData.nickname = rawData.nickname;
      storedData.bestScore = rawData.bestScore;
    } else {
      throw new Error('Invalid stored data');
    }
  }
  } catch(error) {
    console.error(`Error occured: ${error.message}. Stored data will be deleted.` )
    localStorage.removeItem(PLAYER_NAME);
  }
  
  return storedData
}

export function storePlayer(data: StoragePlayerModel) {
  localStorage.setItem(
    PLAYER_NAME,
    JSON.stringify({
      nickname: data.nickname,
      bestScore: data.bestScore
    })
  );
}