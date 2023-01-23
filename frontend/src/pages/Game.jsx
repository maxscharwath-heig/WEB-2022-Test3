import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GuessForm from '../components/GuessForm'
import Board from '../components/Board'

const Game = () => {
  const { id } = useParams()
  const [game, setGame] = useState({ guesses: [], status: 'playing' })
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchGame = async () => {
      const response = await fetch(`http://localhost:8080/api/games/${id}`)

      if (!response.ok) {
        const text = await response.text()
        setError(new Error(`Could not fetch game ${id}: ${text}`))
        return;
      }

      const data = await response.json()
      setGame(data)
    }
    void fetchGame()
  }, [id])

  const handleGuess = async (guess) => {
    //submit guess
    const updatedGame = await submitGuess(guess, id)
    setGame(updatedGame)
  }

  const submitGuess = async (guess, id) => {
    const response = await fetch(`http://localhost:8080/api/games/${id}/guess`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ guess })
    })
    const data = await response.json()
    return data
  }

  if (error) {
    return (
      <div>
        <h1>Mastermind</h1>
        <p>{error.message}</p>
        <Link to="/">Back to home</Link>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center'
    }}
    >
      <Link to="/">Back to home</Link>
      <h1>Mastermind</h1>
      <Board game={game}/>
      {game.status === 'won' && <h2>You win!</h2>}
      {game.status === 'lost' && <h2>You lose!</h2>}
      {game.status === 'playing' &&
        <GuessForm onSubmit={handleGuess}/>
      }
    </div>
  )
}

export default Game
