import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Combo = styled(Select)`
    border-radius: 10px;
    margin: 30px 0 0 0;
    width: 190px;
`

function obterMesAtual() {
  const dataAtual = new Date();
  return dataAtual.getMonth() + 1; // Retorna o número do mês atual
}

function obterMesAtualPorExtenso() {
  const meses = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const dataAtual = new Date();
  return meses[dataAtual.getMonth()]; // Retorna o nome do mês atual
}

function obterMesObjeto() {
  const numeroMes = obterMesAtual().toString().padStart(2, '0');
  const nomeMes = obterMesAtualPorExtenso();

  return {
    value: numeroMes,
    label: nomeMes
  };
}

const options = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

function ComboMonth({value, setMonth}) {
  const [selectedOption, setSelectedOption] = useState(obterMesObjeto());
  const handleChange = (option) => {
    setMonth(option.value);
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

export default ComboMonth;
