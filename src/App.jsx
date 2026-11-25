import './App.css'
import {languages} from "./languages.js";
import {useState} from "react";
import {clsx} from "clsx";
import {getFarewellText, getRandomWord} from "./utils.js";
import ConFetti from 'react-confetti';

function App() {
    const [guessedLetters, setGuessedLetters] = useState([]);

    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const wrongGuessCount = guessedLetters.filter((letter) =>
        !currentWord.includes(letter)).length;

    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameWon || isGameLost;

    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

    const letterElements = currentWord.split("")
        .map((letter, index) => {
            const isGuessed = guessedLetters.includes(letter);
            return <span key={index}>{isGuessed ? letter.toUpperCase() : ''}</span>;
        });

    const keyboardElements = alphabet.split("")
        .map((letter) => {
            const isGuessed = guessedLetters.includes(letter);
            const isCorrect = isGuessed && currentWord.includes(letter);
            const isWrong = isGuessed && !currentWord.includes(letter);
            const className = clsx({
                correct: isCorrect,
                wrong: isWrong
            });
            return (<button disabled={isGuessed || isGameOver} className={className}
                            onClick={() => addGuessedLetter(letter)}
                            key={letter}>{letter.toUpperCase()}</button>);
        });

    const languagesElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount;
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        };
        const className = clsx({
            chip: true,
            lost: isLanguageLost
        })
        return (<span className={className} key={lang.name} style={styles}>{lang.name}</span>)
    });

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters => {
            return prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter];
        });
    }

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewellMessage: !isGameWon && !isGameLost && isLastGuessIncorrect
    });

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>;
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            );
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                    <p>The Correct Word is: { currentWord.toUpperCase() }</p>
                </>
            );
        }
        return null;
    }

    function resetGame() {
        setGuessedLetters([]);
        setCurrentWord(() => getRandomWord());
    }
    return (
        <main>
            { isGameWon && <ConFetti /> }
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                    programming world safe from Assembly!</p>
            </header>

            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>

            <section className="language-chips">
                {languagesElements}
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            {isGameOver && <button onClick={resetGame} className="new-game">New Game</button>}
        </main>
    )
}

export default App
