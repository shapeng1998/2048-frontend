import {initializeBoard, updateBoard, newTileValue} from './board'
import {Directions} from '../types/Directions'

describe('board', () => {
  test('new tile value returns either 2 or 4', () => {
    expect([2, 4]).toContain(newTileValue());
  });

  test('initializes board with two non-zero tiles', () => {
    const boardSize = 4;
    const update = initializeBoard(boardSize);
    expect(update.board.length).toBe(boardSize ** 2);
    expect(update.board.filter(value => value === 0).length).toBe(
      boardSize ** 2 - 2
    );
  });

  test('swipe up', () => {
  const board = [
    4, 4, 2, 0,  // 0, 1, 2, 3,
    0, 0, 2, 2,  // 4, 5, 6, 7,
    0, 2, 0, 2,  // 8, 9, 10, 11,
    2, 2, 4, 4  // 12, 13, 14, 15
  ]
  const {board: newBoard} = updateBoard(board, Directions.UP)
  expect(newBoard[1]).toBe(4)
  expect(newBoard[2]).toBe(4)
  expect(newBoard[6]).toBe(4)
  expect(newBoard[3]).toBe(4)
  expect(newBoard[4]).toBe(2)
  expect(newBoard[5]).toBe(4)  
  expect(newBoard[7]).toBe(4)  
})

  test('swipe right', () => {
  const board = [
    4, 0, 0, 4,
    0, 0, 0, 0,
    4, 2, 2, 0,
    2, 2, 4, 16
  ]
  const {board: newBoard} = updateBoard(board, Directions.RIGHT)
  expect(newBoard[3]).toBe(8)
  expect(newBoard[13]).toBe(4)
  expect(newBoard[14]).toBe(4)
})

  test('swipe down', () => {
  const board = [
    4, 0, 4, 4,  // 0, 1, 2, 3,
    0, 4, 2, 2,  // 4, 5, 6, 7,
    0, 2, 0, 2,  // 8, 9, 10, 11,
    2, 2, 2, 0  // 12, 13, 14, 15
  ]
  const {board: newBoard} = updateBoard(board, Directions.DOWN)
  expect(newBoard[8]).toBe(4)
  expect(newBoard[9]).toBe(4) 
  expect(newBoard[13]).toBe(4)
  expect(newBoard[14]).toBe(4)
})

  test('swipe left', () => {
    const board = [
      4, 0, 0, 4,
      0, 4, 2, 2,
      2, 2, 4, 0,
      2, 2, 0, 8
    ]
    const {board: newBoard} = updateBoard(board, Directions.LEFT)
    expect(newBoard[8]).toBe(4)
    expect(newBoard[0]).toBe(8)
    expect(newBoard[4]).toBe(4)
    expect(newBoard[5]).toBe(4)
    expect(newBoard[12]).toBe(4)
    expect(newBoard[13]).toBe(8)
  })

  test('spawn tile after move', () => {
    const board = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      2, 0, 0, 0,
      2, 0, 0, 0
    ]
    const {board: newBoard} = updateBoard(board, Directions.RIGHT)
    expect(newBoard.filter(value => value === 0).length).toBe(13)
  })

  test('does not spawn tile if move did not happended', () => {
    const board = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      2, 0, 0, 0,
      2, 0, 0, 0
    ]
    const {board: newBoard} = updateBoard(board, Directions.LEFT)
    expect(newBoard.filter(value => value === 0).length).toBe(14)
  })

})