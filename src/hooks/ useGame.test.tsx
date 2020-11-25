import React from 'react'
import {act, renderHook} from '@testing-library/react-hooks'

import {useGame, GameProvider} from '../hooks/useGame'


describe('multiplayer', () => {
  const {result} = renderHook(() => useGame(), {
    wrapper: ({children}) => (
      <GameProvider>
        {children}
      </GameProvider>
    )
  })
  
  act(() => {
    result.current.startMultiplayer({gameId: 'game test123', gameTime: 30000})
    result.current.updateMultiplayer({opponentBoard: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2], opponentScore: 16})
    result.current.resultMultiplayer()
  })

  test('startMultiplayer', () => {
    expect(result.current.gameId).toBe('game test123')
    expect(result.current.board.filter(value => value === 0).length).toBe(14)
  })

  test('updateMultiplayer', () => {
    expect(result.current.opponentBoard).toEqual([0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2])
    expect(result.current.opponentScore).toBe(16)
  })

  test('resultMultiplayer', () => {
    expect(result.current.gameResult).toBe('defeat')
  })
})