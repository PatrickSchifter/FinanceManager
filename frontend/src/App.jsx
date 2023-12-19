import Expense from './fonts/Expense';
import { ChakraProvider } from '@chakra-ui/react';
import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f3f3f3;
`

function App() {
  return (
    <Main>
      <ChakraProvider>
        <Expense />
      </ChakraProvider>
    </Main>
  );
}

export default App;
