import React, { useState } from 'react';
import Select from 'react-select';
import './CUIForm.css';

const traitOptions = [
  { value: 'friendly', label: 'Friendly' },
  { value: 'assertive', label: 'Assertive' },
  { value: 'patient', label: 'Patient' },
  // Add more options as needed
];

const CUIForm = ({ onGenerate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [traits, setTraits] = useState([]);
  const [communicationStyle, setCommunicationStyle] = useState('');
  const [goal, setGoal] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [temperature, setTemperature] = useState(0.5);
  const [topP, setTopP] = useState(1);
  const [maxLength, setMaxLength] = useState(100);

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate({
      name, description, traits, communicationStyle, goal, primaryColor, secondaryColor, temperature, topP, maxLength
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description</label>
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Traits</label>
      <Select 
        isMulti
        options={traitOptions}
        onChange={selectedOptions => setTraits(selectedOptions.map(option => option.value))}
      />
      <label>Communication Style</label>
      <input type="text" placeholder="Communication Style" value={communicationStyle} onChange={(e) => setCommunicationStyle(e.target.value)} />
      <label>Goal</label>
      <input type="text" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
      <label>Color Theme - Primary x Secondary</label>
      <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
      <input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
      <label>Temperature</label>
      <input type="range" min="0" max="1" step="0.01" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
      <label>topP</label>
      <input type="range" min="0" max="1" step="0.01" value={topP} onChange={(e) => setTopP(e.target.value)} />
      <label>Max Character Length</label>
      <input type="number" min="1" value={maxLength} onChange={(e) => setMaxLength(e.target.value)} />
      <button type="submit">Generate CUI</button>
    </form>
  );
}

export default CUIForm;
