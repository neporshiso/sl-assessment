import * as React from 'react';
import axios from 'axios';
import { Button, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { Table } from './components/Table';
import { AppWrapper, ButtonWrapper, theme } from './components/Styled';
import {
  peopleDataColumns,
  levelTwoColumns,
  levelTwoSortModel,
} from './tableConfig';

import './App.css';

function App() {
  const [showTable, setShowTable] = React.useState(1);
  const [peopleData, setPeopleData] = React.useState([]);
  const [charCountData, setCharCountData] = React.useState([]);
  const [duplicatePeopleData, setDuplicatePeopleData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/people');
        setPeopleData(data);
        setIsLoading(false);
        return data;
      } catch (e) {
        console.error(e);
        setIsLoading(false);
        throw new Error('Error fetching people data.');
      }
    };

    fetchPeopleData();
  }, []);

  const handleLevelTwoClick = () => {
    const emailAddressString = peopleData.map((p) => p.email_address).join('');
    const charCountObj = [...emailAddressString].reduce((acc, currentValue) => {
      acc[currentValue] = acc[currentValue] ? acc[currentValue] + 1 : 1;
      return acc;
    }, {});

    const result = Object.keys(charCountObj).map((k) => {
      return {
        id: k,
        char: k,
        count: charCountObj[k],
      };
    });

    setCharCountData(result);
    setShowTable(2);
  };

  const handleLevelThreeClick = () => {
    const potentialDuplicates = [];
    const emailAddressArr = peopleData.map((p) => p.email_address);
    // Business Logic to determine if two emails potentially belong to the same person
    const substringCheck = (currentEmail, evaluatingEmail) => {
      // fail fast if you're comparing the same email
      if (currentEmail === evaluatingEmail) return false;

      const currentEmailDomain = currentEmail.substring(
        currentEmail.indexOf('@') + 1,
      );

      const evaluatingEmailDomain = evaluatingEmail.substring(
        evaluatingEmail.indexOf('@') + 1,
      );

      // Want to detect different domains and return false early to prevent false positive detections
      if (currentEmailDomain !== evaluatingEmailDomain) return false;

      const currentEmailPreAt = currentEmail.substring(
        0,
        currentEmail.indexOf('@'),
      );
      const evaluatingEmailPreAt = evaluatingEmail.substring(
        0,
        currentEmail.indexOf('@'),
      );

      if (evaluatingEmailPreAt.indexOf(currentEmailPreAt) > -1) return true;
      return false;
    };

    for (let i = 0; i < emailAddressArr.length; i++) {
      for (let j = 0; j < emailAddressArr.length; j++) {
        if (substringCheck(emailAddressArr[i], emailAddressArr[j])) {
          potentialDuplicates.push(emailAddressArr[i], emailAddressArr[j]);
        }
      }
    }

    const duplicatedPersons = [];
    potentialDuplicates.forEach((email) => {
      const person = peopleData.find((el) => el.email_address === email);
      duplicatedPersons.push(person);
    });

    setShowTable(3);
    setDuplicatePeopleData(duplicatedPersons);
    return;
  };

  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        {showTable === 1 && (
          <>
            <Typography variant="h1">Level One Table</Typography>
            <Table
              isLoading={isLoading}
              columns={peopleDataColumns}
              rows={peopleData}
              pageSize={25}
            />
            <ButtonWrapper>
              <Button
                data-testid="Button1"
                disabled={isLoading}
                variant="contained"
                color="primary"
                onClick={() => handleLevelTwoClick()}
              >
                Show Character Frequency Count
              </Button>
            </ButtonWrapper>
          </>
        )}
        {showTable === 2 && (
          <>
            <Typography variant="h1">Level Two Table</Typography>
            <Table
              isLoading={isLoading}
              columns={levelTwoColumns}
              rows={charCountData}
              pageSize={25}
              sortModel={levelTwoSortModel}
              maxWidth="400px"
            />

            <ButtonWrapper minWidth="400px">
              <Button
                data-testid="Button2"
                variant="contained"
                color="primary"
                onClick={() => handleLevelThreeClick()}
              >
                Show Potential Duplicates
              </Button>
            </ButtonWrapper>
          </>
        )}
        {showTable === 3 && (
          <>
            <Typography variant="h1">Level Three Table</Typography>
            <Table
              isLoading={isLoading}
              columns={peopleDataColumns}
              rows={duplicatePeopleData}
              pageSize={25}
            />

            <ButtonWrapper>
              <Button
                data-testid="Button3"
                variant="contained"
                color="primary"
                onClick={() => setShowTable(1)}
              >
                Start Over
              </Button>
            </ButtonWrapper>
          </>
        )}
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
