import React, { useEffect } from 'react'

const Home = () => {
  const [games, setGames] = React.useState([]);

  const fetchGames = async () => {
    const response = await fetch('http://localhost:8080/api/games');
    const games = await response.json();
    setGames(games);
  }

    const createGame = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        if (data.has("id")) {
            const id = data.get("id");
            await fetch('http://localhost:8080/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            })
        }
        await fetchGames();
    };

  useEffect(() => {
    void fetchGames();
  }, []);

    return (
        <div>
            <h1>Mastermind</h1>
            <h2>Create a new game</h2>
            <form onSubmit={createGame}>
                <input type="text" name="id" placeholder="Identifier"/>
                <input type="submit" value="Create"/>
            </form>

            <h2>Existing games</h2>
            <p>Afficher la liste des parties</p>
            {
                /**
                 * TODO:
                 * Afficher la liste des parties en cours avec un lien vers la page de la partie.
                 * La console ne doit pas afficher de warning.
                 */
                games.map((game) => (
                    <div key={`game-${game}`}>
                        <a href={`/${game}`}>{game}</a>
                    </div>
                ))
            }
        </div>
    );
};

export default Home;
