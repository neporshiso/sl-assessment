import styled from 'styled-components';
import { createTheme } from '@material-ui/core';

export const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

export const TableWrapper = styled.div`
  height: 600px;
  max-width: ${(props) => props.maxWidth ?? '900px'};
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  justify-self: flex-start;
  align-self: center;
  min-width: ${(props) => props.minWidth ?? '900px'};
  margin-top: 16px;
`;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4a90e2',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
    },
  },
});
