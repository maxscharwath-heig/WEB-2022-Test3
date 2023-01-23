import React, { useEffect } from 'react'

const Home = () => {
  const [games, setGames] = React.useState([])
  const [error, setError] = React.useState(null)

  const fetchGames = async () => {
    const response = await fetch('http://localhost:8080/api/games')
    const games = await response.json()
    setGames(games)
  }

  const createGame = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    setError(null)
    if (data.has('id')) {
      const id = data.get('id')
      const res = await fetch('http://localhost:8080/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      if (!res.ok) {
        const text = await res.text()
        setError(new Error(`Error ${res.status}: ${res.statusText}, ${text}`))
      } else {
        await fetchGames()
      }
    }
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/games/${id}`, {
      method: 'DELETE',
    })
    await fetchGames()
  }

  useEffect(() => {
    void fetchGames()
  }, [])

  return (
    <div>
      <h1>Mastermind</h1>
      <h2>Create a new game</h2>
      <form onSubmit={createGame}>
        <input type="text" name="id" placeholder="Identifier"/>
        <input type="submit" value="Create"/>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>

      <h2>Existing games</h2>
      <p>Afficher la liste des parties</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          games.map((game) => (
            <li key={`game-${game}`} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <a href={`/${game}`}
                 style={{ color: 'white', backgroundColor: 'blue', padding: '0.5rem', textDecoration: 'none' }}>
                Continue your game "{game}"
              </a>
              <button
                style={{
                  marginLeft: '1rem',
                  color: 'white',
                  backgroundColor: 'red',
                  border: 'none',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}
                onClick={() => handleDelete(game)}
              >
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home
