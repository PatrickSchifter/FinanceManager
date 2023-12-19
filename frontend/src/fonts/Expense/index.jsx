import React, {useState, useEffect} from 'react'
import ExpenseGrid from './ExpenseGrid';
import styled from 'styled-components';
import ButtonGreen from '../../components/Buttons/Green';
import {color} from '../../globalStyle/color';
import ModalAdd from '../../components/ModalAdd';
import ComboMonth from '../../components/Combo/Month';
import ComboYear from '../../components/Combo/Year';
import { useStepContext } from '@chakra-ui/react';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: flex-start;

    min-width: 800px;
    height: 95%;
    margin-left: 30px;
`

const Title = styled.h1`
    font-size: 30px;
    font-weight: bold;
    color: ${color.fontPrimary};
`

const ContainerMonthYear = styled.div`
  display: flex;
  justify-content: space-between;
  width: 310px;
`

const ContainerAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

function getCurrentYear() {
  const today = new Date();
  return today.getFullYear().toString();
}

function getCurrentMonth() {
  const dataAtual = new Date();
  return dataAtual.getMonth() + 1; // Retorna o número do mês atual
}


const Expense = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [month, setMonth] = useState(getCurrentMonth().toString());
  const [year, setYear] = useState(getCurrentYear());
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [totalPaid, setTotalPaid] = useState(null);
  const [totalUnpaid, setTotalUnpaid] = useState(null);

  const handleOpenCloseModal = () => {
    setOpenModal((old) => !old);
  }

  const getInitialAndFinalDate = () => {
    let monthInt = parseInt(month);
    let yearInt = parseInt(year);
    const initialDateF = new Date(yearInt, monthInt - 1, 1);
    const finalDateF = new Date(yearInt, monthInt, 0);
    setInitialDate(`${initialDateF.getFullYear()}-${(initialDateF.getMonth() + 1).toString().padStart(2, '0')}-${initialDateF.getDate().toString().padStart(2, '0')}`);
    setFinalDate(`${finalDateF.getFullYear()}-${(finalDateF.getMonth() + 1).toString().padStart(2, '0')}-${finalDateF.getDate().toString().padStart(2, '0')}`);
  }

  useEffect(() => {
    const getData = async () => {
      await fetch(`http://localhost:3000/expense?inital_date=${initialDate}&final_date=${finalDate}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error);
      });

      await fetch(`http://localhost:3000/expense/total-paid?month=${year.toString() + '-' + month}`)
      .then(response => response.json())
      .then(data => {
        setTotalPaid(data.data[0].total);
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error);
      });

      await fetch(`http://localhost:3000/expense/total-unpaid?month=${year.toString() + '-' + month}`)
      .then(response => response.json())
      .then(data => {
        setTotalUnpaid(data.data[0].total);
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error);
      });
    }
    getInitialAndFinalDate();
    if(initialDate && finalDate){
      getData();
    }
  }, [update, month, year, initialDate]);

  useEffect(() => {
    getInitialAndFinalDate();
  }, [])
    
  return (
    <Main>
        <ModalAdd openModal={openModal} handleClose={handleOpenCloseModal} setUpdate={setUpdate} />
        <Title>Expenses </Title>
        <ContainerAction>
          <ButtonGreen title={'Add'} onClick={() => handleOpenCloseModal()} />
          <ContainerMonthYear>
            <ComboMonth setMonth={setMonth}/>
            <ComboYear setYear={setYear}/>
          </ContainerMonthYear>
        </ContainerAction>
        <ExpenseGrid data={data} setUpdate={setUpdate} />
        <p>Total Paid: {totalPaid ? totalPaid : '0'}</p>
        <p>Total Unpaid: {totalUnpaid ? totalUnpaid : '0'}</p>
    </Main>
  )
}

export default Expense;
