import React, {useState} from 'react';

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

    const handleChange = (event, index) => {
        setError(null);
        const {value} = event.target;
        guess[index] = value
        setGuess([...guess])
    };

    return (
        <form onSubmit={handleSubmit} style={{borderTop: 'solid 2px black', paddingTop: '1rem'}}>
            {error && <div style={{color: 'red', padding: '8px'}}>{error}</div>}
            {[...Array(4)].map((_, i) => <PegInput key={i} i={i} value={guess[i] || ''} onChange={handleChange}/>)}
            <button type="submit" style={{marginTop: '1rem'}}>Guess</button>
        </form>
    );
};

const PegInput = ({i, value, onChange}) => {
    return (<div>
        <label>
            Position {i + 1} :
            <select value={value} onChange={(ev) => onChange(ev, i)}>
                <option value="" disabled>Select color</option>
                {colors.map((color) => (
                    <option key={color} value={color}>{color}</option>
                ))}
            </select>
        </label>
    </div>);
};

export default GuessForm;
