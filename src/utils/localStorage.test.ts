import { getStoredBoard, storeBoard, getStoredPlayer, storePlayer } from './localStorage';

const BOARD_NAME = '2048.vs_board';
const PLAYER_NAME = '2048.vs_player';

describe('board', () => {
  test('stores board', () => {
    storeBoard({});
    expect(localStorage.getItem(BOARD_NAME)).toBe('{}');
  });

  test('reads board', () => {
    localStorage.setItem(BOARD_NAME, '{}');
    expect(getStoredBoard()).toMatchObject({});
  });

  test('discards invalid board data', () => {
    localStorage.setItem(BOARD_NAME, '{"board":"wrong"}');
    expect(getStoredBoard()).toMatchObject({});
  });
});

describe('board', () => {
  test('stores player', () => {
    storePlayer({});
    expect(localStorage.getItem(PLAYER_NAME)).toBe('{}');
  });

  test('reads player', () => {
    localStorage.setItem(PLAYER_NAME, '{}');
    expect(getStoredBoard()).toMatchObject({});
  });

  test('discards invalid player data', () => {
    localStorage.setItem(PLAYER_NAME, '{"nickname":"wrong"}');
    expect(getStoredBoard()).toMatchObject({});
  });
})
