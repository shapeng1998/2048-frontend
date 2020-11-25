import React from 'react'
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/core'


interface TileInterface {
  value: number;
  size?: string;
}

function Tile({value, size}: TileInterface) {
  const stringValue = value.toString()
  return(
    <Cell size={size}>
      {value !== 0 && (
        <CellInner value={stringValue}>
          {value}
        </CellInner>
      )}
    </Cell>
  )
}

export default Tile;

interface ICell {
  size?: string;
}

const styleSmall = css`
  border-radius: 1px;
  font-size: .6rem;
`
const styleNormal = css`
  border-radius: 3px;
  font-size: 1.6rem;
`

const Cell = styled.div`
  position: relative;
  
  padding-bottom: 100%;
  background: #cdc1b4;
  line-height: 0;
  ${({size}: ICell) => size === 'small' ? styleSmall : styleNormal}
`

const CellInner = styled.div`
  background: #3c3a32;
  color: #f9f6f2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  border-radius: 3px;
  z-index: 9;

  ${({value}: {value: string}) => tilesColors[value]}
`

const tilesColors: {[key: string]: SerializedStyles} = {
  2: css`
    background: #eee4da;
    color: #776e65;
    font-size: 1.7em;
  `,
  4: css`
    background: #ede0c8;
    color: #776e65;
    font-size: 1.7em;
  `,

  8: css`
    background: #f2b179;
    font-size: 1.7em;
  `,

  16: css`
    background: #f59563;
    font-size: 1.7em;
  `,

  32: css`
    background: #f67c5f;
    font-size: 1.7em;
  `,

  64: css`
    background: #f65e3b;
    font-size: 1.7em;
  `,

  128: css`
    background: #edcf72;
    font-size: 1.3em;
  `,

  256: css`
    background: #edcc61;
    font-size: 1.3em;
  `,

  512: css`
    background: #edc850;
    font-size: 1.3em;
  `,

  1024: css`
    background: #edc53f;
  `,

  2048: css`
    background: #edc22e;
  `
}

  
  
  

