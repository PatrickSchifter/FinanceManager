import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Combo = styled.select`
    border-radius: 10px;
    height: 20px;
    margin: 0;
    padding: 0;
    background-color: transparent;
`

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const options = [
  { value: true, label: 'Yes' },
  { value: false, label: 'Not' }
];

function ComboPaidGrid({value, setUpdate, idexpense}) {
  const [selectedOption, setSelectedOption] = useState({value:value, label: value ? 'Yes' : 'Not'});

  const handleChange = async (event) => {
    await fetch(`http://localhost:3000/expense`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({expense: {idexpense: idexpense, paid: event.target.value}})
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
    setUpdate((old) => !old);
  };

  return (
    <Combo value={value} onChange={handleChange}>
      <option value="true">Yes</option>
      <option value="false">Not</option>
    </Combo>
  );
}

export default ComboPaidGrid;
