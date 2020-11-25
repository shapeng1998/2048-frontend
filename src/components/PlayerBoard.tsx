import React, {useEffect, useState, useCallback, useRef} from 'react'
import styled from '@emotion/styled';

import {Directions} from '../types/Directions'
import {useGame} from '../hooks/useGame'
import Tile from './Tile'
import { Point } from '../types/Models';


function PlayerBoard() {
  const {board, makeMove} = useGame()
  const [allowMove, setAllowMove] = useState(false)
  const startPointerLocation = useRef<Point>();
  const currentPointerLocation = useRef<Point>();

  const handleMove = (direction: Directions) => {
    makeMove(direction)
  }
  

  useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case 'ArrowDown':
          handleMove(Directions.DOWN);
          break;
        case 'ArrowUp':
          handleMove(Directions.UP);
          break;
        case 'ArrowLeft':
          handleMove(Directions.LEFT);
          break;
        case 'ArrowRight':
          handleMove(Directions.RIGHT);
          break;
      }
    };

    window.addEventListener('keydown', keydownListener);

    return () => {
      window.removeEventListener('keydown', keydownListener);
    };
  }, []);

  const finishPointer = useCallback(
    (a: Point, b: Point) => {
      const distance = Math.sqrt((b.y - a.y) ** 2 + (b.x - a.x) ** 2);
      if (distance < 20) {
        return;
      }
      // angle in degrees (Math.atan2 returns andgle in radians)
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      if (angle < -135 || angle > 135) {
        handleMove(Directions.LEFT);
      } else if (angle < -45) {
        handleMove(Directions.UP);
      } else if (angle < 45) {
        handleMove(Directions.RIGHT);
      } else if (angle < 135) {
        handleMove(Directions.DOWN);
      }
    },
    [handleMove]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      startPointerLocation.current = point;
    }
  }, []);
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (touch) {
      const point: Point = { x: touch.pageX, y: touch.pageY };
      currentPointerLocation.current = point;
    }
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      if (startPointerLocation.current && currentPointerLocation.current) {
        finishPointer(
          startPointerLocation.current,
          currentPointerLocation.current
        );
      }

      startPointerLocation.current = undefined;
      currentPointerLocation.current = undefined;
    },
    [finishPointer]
  );

  return(
    <BoardContainer
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <Board>
        {
          board.map((value: number, idx: number) => <Tile key={idx} value={value}/>)
        }
      </Board>
    </BoardContainer>
  )
}

export default PlayerBoard;

const BoardContainer = styled.div`
  width: 100%;
  margin-bottom: 5%;
  margin: 0 auto;
`
const Board = styled.div`
  margin: auto;
  width: 90%;
  position: relative;
  background: #bbada0;
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: .5rem;
  padding: .5rem;
  user-select: none;
  touch-action: none;
`