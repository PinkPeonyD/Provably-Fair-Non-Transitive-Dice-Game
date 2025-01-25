# Non-Transitive Dice Game

This project implements a console-based game using non-transitive dice with provably fair random number generation. The game is written in Node.js and allows configurable dice values, interactive gameplay, and proof of fairness via HMAC.

---

## Features

- **Customizable dice values**: Supports any number of dice with user-defined face values.
- **Provably fair gameplay**: Implements HMAC-SHA3 with unique secret keys for unbiased random number generation.
- **Interactive CLI gameplay**: Engaging and intuitive command-line interface.
- **Help feature**: Displays a probability table for winning chances between dice pairs.
- **Error handling**: Detects and reports invalid input parameters with helpful error messages.

---

## Requirements

- **Node.js** (v14 or higher recommended)

---

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/PinkPeonyD/Provably-Fair-Non-Transitive-Dice-Game.git
   cd Provably-Fair-Non-Transitive-Dice-Game
2. npm install
3. npx tsc
