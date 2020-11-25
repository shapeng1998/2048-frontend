import React from 'react'
import {act, renderHook} from '@testing-library/react-hooks'

import {usePlayer, PlayerProvider} from '../hooks/usePlayer'


describe('usePlayer', () => {
  const {result} = renderHook(() => usePlayer(), {
    wrapper: ({children}) => (
      <PlayerProvider>
        {children}
      </PlayerProvider>
    )
  })
  
  act(() => {
    result.current.setNickname('test123')
    result.current.setBestScore(16)
  })

  test('allows to get and set nickname', () => {
    expect(result.current.nickname).toBe('test123')
  })

  test('allows to get and set best score', () => {
    expect(result.current.bestScore).toBe(16)
  })
})

