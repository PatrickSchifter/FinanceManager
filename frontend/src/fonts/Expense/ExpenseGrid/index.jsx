import React, { useState } from 'react';
import styled from 'styled-components';
import { convertToBrazilianDate } from '../../../utils/utils';
import {color} from '../../../globalStyle/color'
import { Button } from '@chakra-ui/react';
import ComboPaidGrid from '../../../components/Combo/PaidGrid';

const Table = styled.table`
  border-collapse: collapse;
  margin: 20px 0;
  color: ${color.fontPrimary};
  width: 100%;

  td {
    padding: 8px;
    border-bottom: 1px solid #b9b8b8;
    text-align: left;
  }

  th {
    font-weight: bold;
    text-align: left;
    border-bottom: 5px solid #ddd;
    padding-bottom: 10px;
  }

  tr:nth-child(even) {
    background-color: #e4e4e4;
  }
`;

const TdButton = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;

`

const ExpenseGrid = ({data, setUpdate}) => {
  const [mode, setMode] = useState('V');

  const handleClickDelete = async(idexpense) => {
    await fetch(`http://localhost:3000/expense`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({expense: {idexpense: idexpense}})
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
    
    setUpdate((old) => !old);
  }
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Paid</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(expense => (
            <tr key={expense.idexpense}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{convertToBrazilianDate(expense.date)}</td>
              <td>{<ComboPaidGrid value={expense.paid} setUpdate={setUpdate} idexpense={expense.idexpense} />}</td>
              <TdButton><Button colorScheme='red' size='xs' onClick={() => handleClickDelete(expense.idexpense)}>Delete</Button></TdButton>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseGrid;
