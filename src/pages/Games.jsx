import './Games.css'

function Games() {
  const games = [
    {
      id: 1,
      title: "Puzzle Master",
      description: "Challenge your mind with intricate puzzles",
      category: "Puzzle",
      players: "1 Player"
    },
    {
      id: 2,
      title: "Space Adventure",
      description: "Explore the cosmos in this epic space journey",
      category: "Adventure",
      players: "1 Player"
    },
    {
      id: 3,
      title: "Racing Thunder",
      description: "High-speed racing action",
      category: "Racing",
      players: "1-4 Players"
    },
    {
      id: 4,
      title: "Word Wizard",
      description: "Test your vocabulary skills",
      category: "Word",
      players: "1-2 Players"
    },
    {
      id: 5,
      title: "Card Master",
      description: "Classic card games collection",
      category: "Card",
      players: "1-4 Players"
    },
    {
      id: 6,
      title: "Memory Challenge",
      description: "Train your memory with fun exercises",
      category: "Memory",
      players: "1 Player"
    }
  ]

  return (
    <div className="games">
      <div className="games-header">
        <h1>Our Games Collection</h1>
        <p>Discover amazing games to play right in your browser!</p>
      </div>
      
      <div className="games-grid">
        {games.map(game => (
          <div key={game.id} className="game-card">
            <div className="game-category">{game.category}</div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-info">
              <span className="players">{game.players}</span>
            </div>
            <button className="play-button">Play Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Games 