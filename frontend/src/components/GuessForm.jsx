import React, {useState} from 'react';
import PegInput from './PegInput'

const colors = ["red", "green", "blue", "yellow", "purple", "orange"];

const GuessForm = ({onSubmit}) => {
    const [guess, setGuess] = useState([null, null, null, null]);
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const allColorsSelected = guess.filter((color) => color === null).length === 0;
        if (!allColorsSelected) {
            setError('Please select a color for each position');
            return;
        }
        onSubmit(guess);
    };

    const handleChange = (color, index) => {
        setError(null);
        guess[index] = color;
        setGuess([...guess])
    };

    return (
        <form onSubmit={handleSubmit} style={{borderTop: 'solid 2px black', paddingTop: '1rem'}}>
            {error && <div style={{color: 'red', padding: '8px'}}>{error}</div>}
            <div style={{display: 'flex', gap: '1rem', flexDirection: 'column'}}>
                {colors.map((color, i) => <PegInput key={i} color={color} guess={guess} onChange={handleChange}/>)}
            </div>
            <button type="submit" style={{marginTop: '1rem'}}>Guess</button>
        </form>
    );
};

export default GuessForm;
