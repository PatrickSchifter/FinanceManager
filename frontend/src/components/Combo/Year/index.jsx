import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Combo = styled(Select)`
    width: 100px;
    border-radius: 10px;
    margin: 30px 0 0 0;
`

function getCurrentYear() {
  const today = new Date();
  return today.getFullYear(); // Retorna o número do mês atual
}


const options = [];

const adjustOptions = () => {
  for(let initialYear = 2023; initialYear < getCurrentYear() + 3; initialYear++){
    options.push({value: initialYear.toString(), label: initialYear.toString()});
  }
};

adjustOptions();

function ComboYear({setYear}) {
  const [selectedOption, setSelectedOption] = useState({value: getCurrentYear().toString(), label: getCurrentYear().toString()});
  const handleChange = (option) => {
    setYear(option.value);
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

export default ComboYear;
