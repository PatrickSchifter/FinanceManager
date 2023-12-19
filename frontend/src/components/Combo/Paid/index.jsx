import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Combo = styled(Select)`
    border-radius: 10px;
`

const options = [
  { value: true, label: 'Yes' },
  { value: false, label: 'Not' }
];

function ComboPaid({value, dispatch}) {
  const [selectedOption, setSelectedOption] = useState({value:false, label: 'Not'});

  const handleChange = (option) => {
    dispatch({type:'setPaid', payload: option.value})
    setSelectedOption(option);
  };

  return (
    <div>
      <Combo
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Selecione uma opção"
      />
    </div>
  );
}

export default ComboPaid;
