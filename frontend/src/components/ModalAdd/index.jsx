import React, {useReducer, useEffect, useState} from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Checkbox } from '@chakra-ui/react';
import styled from 'styled-components';

import ComboPaid from '../Combo/Paid';

const Label = styled.label`
    margin-bottom: 5px;
`

const Input = styled.input`
    width: 100%;
    height: 35px;
    margin-bottom: 15px;
    padding-left: 10px;

    border: 1px solid #cacaca;
    border-radius: 5px;

`

const InputRepeat = styled.input`
    width: 40px;
    height: 35px;
    padding-left: 5px;
    margin-left: 10px;

    border: 1px solid #cacaca;
    border-radius: 5px;

`

const Body = styled(ModalBody)`
    display: flex;
    flex-direction: column;
`

const ContainerFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left:30px;

    width: 95%;
`


const initalState = {
    description: '',
    amount: '',
    date: '',
    paid: false
}

const Footer = styled(ModalFooter)`
    width: 200px;
`

const reducer = (state, action) => {
    switch(action.type){
        case 'setDescription':
            return {...state, description: action.payload};
        case 'setAmount':
            return {...state, amount: action.payload};
        case 'setDate':
            return {...state, date: action.payload};
        case 'setPaid':
            return {...state, paid: action.payload};
        case 'reset':
            return initalState;
        default:
            return state;
    }
}

function addMonthsToDate(date, monthsToAdd) {
    const dates = [];
    let dateSplit = date.split('-');
    let currentMonth = parseInt(dateSplit[1]);
    let day = parseInt(dateSplit[2]);
    let year = parseInt(dateSplit[0]);
    let lastDayOfMonths = {
        1:31,
        2: year % 4 === 0 ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }
    
    for(let monthAdded = 0; monthAdded < monthsToAdd; monthAdded++){
        currentMonth = currentMonth + 1;
        if(currentMonth === 13){
            currentMonth = 1;
            year = year + 1;
            lastDayOfMonths[2] = year % 4 === 0 ? 29 : 28;
        };
        if(day <= lastDayOfMonths[currentMonth]){
            dates.push(`${year}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${day}`);
        }else{
            dates.push(`${year}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${lastDayOfMonths[currentMonth]}`);
        }
    }

    return dates;
}

const ModalAdd = ({openModal, handleClose, setUpdate}) => {
    const [state, dispatch] = useReducer(reducer, initalState);
    const [repeat, setRepeat] = useState(false);
    const [qttMonth, setQttMonth] = useState(0);

    const insertExpense = async (date) => {
        let data = {...state, date: date};
        await fetch('http://localhost:3000/expense', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json' 
        
                    },
                    body: JSON.stringify({expense: data})
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    }

    const handleSave = async () => {
        if(repeat){
            const datesToInsert = addMonthsToDate(state.date, qttMonth - 1);
            await insertExpense(state.date);
            setUpdate((old) => !old);
            datesToInsert.forEach(async (date) => {
                await insertExpense(date);
            });
        }else{
            insertExpense(state.date);
            setUpdate((old) => !old);
        }
        dispatch({type: 'reset'});
        setQttMonth(0);
        setRepeat(false);
        handleClose();
    }

    const handleChangeCheckbox = (event) => {
        setRepeat(event.target.checked)
    }

    return (
        <Modal isOpen={openModal} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Add Expense</ModalHeader>
            <ModalCloseButton />
            <Body>
                <Label >Description</Label>
                <Input type="text" id="description" name="description"  value={state.description} onChange={(event) => dispatch({type: 'setDescription', payload: event.target.value})} />
                <Label >Amount</Label>
                <Input type="number" id="amount" name="amount" value={state.amount} onChange={(event) => dispatch({type: 'setAmount', payload: event.target.value})}/>
                <Label >Date</Label>
                <Input type="date" id="date" name="date" onChange={(event) => dispatch({type: 'setDate', payload: event.target.value})}/>
                <Label>Paid</Label>
                <ComboPaid dispatch={dispatch} value={state.paid} />
            </Body>
            <ContainerFooter>
                <Checkbox value={repeat} onChange={handleChangeCheckbox}>Repeat (In Months)</Checkbox>
                {repeat ? <InputRepeat type="number" id="amount" name="amount" value={qttMonth} onChange={(event) => setQttMonth(event.target.value)}/> : <></>}
                <Footer>
                    <Button variant="ghost" onClick={handleClose}>
                    Cancel
                    </Button>
                    <Button colorScheme="blue" mr={3} onClick={handleSave}>
                    Save
                    </Button>
                </Footer>
            </ContainerFooter>

            </ModalContent>
        </Modal>
    )
}

export default ModalAdd
