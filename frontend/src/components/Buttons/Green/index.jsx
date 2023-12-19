import React from 'react';
import styled from 'styled-components';
import {color} from '../../../globalStyle/color'

const Button = styled.button`
  width: 150px;
  height: 35px;
  margin: 30px 0 0 0;
  background-color: #99f599;
  border: 1px solid white;
  border-radius: 10px;
  cursor: pointer;
  color: ${color.fontPrimary};
  font-weight: bold;

  &:hover{
    color: white;
  }
`

const ButtonGreen = ({title, onClick}) => {
  return (
    <Button onClick={onClick}>
      {title}
    </Button>
  )
}

export default ButtonGreen;
