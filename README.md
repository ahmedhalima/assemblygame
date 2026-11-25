# Assembly: Endgame

> *"Guess the word within 8 attempts to keep the programming world safe from Assembly!"*

**Assembly: Endgame** is a React + Vite word-guessing game inspired by Hangman. Every incorrect guess moves the programming world closer to an Assembly takeover. Decode the hidden word within **8 attempts** to keep high-level languages alive.

---

## Table of Contents

- [Gameplay & Mechanics](#gameplay--mechanics)
- [Features](#features)
- [Tech Stack & Project Structure](#tech-stack--project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Accessibility & UX Details](#accessibility--ux-details)
- [License](#license)

---

## Gameplay & Mechanics

1. **Secret Word:** A random word is selected at the start of each round and displayed as blank letter tiles.
2. **Guessing:** Click letters on the interactive on-screen keyboard (or type using your physical keyboard, if enabled) to reveal matching characters.
3. **8 Attempts:** You have **8 wrong guesses** before losing:
   - **Correct guess:** Reveals all matching positions in the word and highlights the key in **green**.
   - **Wrong guess:** Eliminates one safeguard in line, triggers a dynamic status/farewell banner, and highlights the key in **red**.
4. **Win / Loss States:**
   - **Win:** Reveal the entire word within 8 wrong guesses—celebrated with confetti and a victory banner.
   - **Loss:** Exhaust all 8 attempts and face the **Assembly** takeover, revealing any unguessed letters in red.
5. **New Game:** Click **New Game** at the end of a round to reset the board, restore all 8 attempts, and load a fresh word.

---

## Features

- **Reactive State Management:** Derived game state (`wrongGuessCount`, `isGameWon`, `isGameLost`, `isGameOver`) computed cleanly from `currentWord` and `guessedLetters` without redundant state variables.
- **Dynamic Status & Farewell Messages:** Contextual feedback and randomized farewell quotes when an attempt is lost.
- **Interactive On-Screen Keyboard:** Color-coded keys (`default`, `correct`, `wrong`) that automatically disable once guessed or when the round ends.
- **Victory Celebration:** Confetti burst upon winning via `react-confetti`.
- **Screen-Reader Friendly:** Uses `aria-live` polite status regions and descriptive `aria-label` attributes on letter tiles and keyboard buttons.

---

## Tech Stack & Project Structure

- **Framework:** React (Functional Components & Hooks)
- **Build Tool:** Vite
- **Styling:** CSS3 (Custom Properties / Flexbox / Grid)
- **Libraries:** `clsx` (conditional class names), `react-confetti` (victory animation)

