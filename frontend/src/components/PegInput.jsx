import React from 'react'
import Peg from './Peg'

const PegInput = ({ color, guess, onChange }) => {
  return (<div style={{ display: 'flex', gap: '1rem' }}>
    {[...Array(4)].map((_, key) => (
      <Peg
        key={`${color}-${key}`}
        color={color}
        borderWidth={guess[key] === color ? '4px' : '2px'}
        onClick={() => onChange(color, key)}
      />
    ))}
  </div>)
}

export default PegInput
