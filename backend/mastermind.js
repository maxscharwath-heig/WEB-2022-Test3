const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange']

// A game object holds the state of a Mastermind game.
// The code is a private list of four colors hidden from the player.
class Game {
  #code
  // An other solution is instead using private fields, we can overwrite the toJSON method and chose what to return.

  // Constructs a new game with the given code and guesses.
  // If no code is given, a random code is generated.
  // If no guesses are given, an empty list of guesses is used.
  constructor (code, guesses) {
    this.#code = code || Game.generateCode()
    this.guesses = guesses || []
    this.status = 'playing'
  }

  // Returns a random code.
  static generateCode () {
    return Array.from(Array(4), () => colors[Math.floor(Math.random() * colors.length)])
  }

  // Plays a guess and returns the feedback.
  play (guess) {
    const correctColors = this.#code
      .filter((color, index) => color === guess[index])
      .length

    const correctColorsWrongPlace = this.#code
      .filter((color, index) => color !== guess[index] && guess.includes(color))
      .length

    const feedback = new Feedback(guess, correctColors, correctColorsWrongPlace)

    this.guesses.push(feedback)

    if (this.guesses[this.guesses.length - 1].blackPins === 4) {
      this.status = 'won'
    } else if (this.guesses.length >= 10) {
      this.status = 'lost'
    }

    return feedback
  }
}

// A feedback object contains the guess,
// the number of correct colors and correct positions,
// and the number of correct colors and wrong positions.
class Feedback {
  constructor (guess, blackPins, whitePins) {
    this.guess = guess
    this.blackPins = blackPins
    this.whitePins = whitePins
  }
}

module.exports = { Game, Feedback }
