import * as React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { TableOne } from './components/TableOne';
import { TableTwo } from './components/TableTwo';

import './App.css';

function App() {
  const [showTable, setShowTable] = React.useState(1);
  const [peopleData, setPeopleData] = React.useState([]);
  const [charCountData, setCharCountData] = React.useState([]);
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

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      {showTable === 1 && (
        <TableOne isLoading={isLoading} rows={peopleData} pageSize={25} />
      )}
      {showTable === 2 && (
        <TableTwo isLoading={isLoading} rows={charCountData} pageSize={25} />
      )}
      <div
        style={{
          justifySelf: 'flex-start',
          alignSelf: 'center',
          minWidth: '900px',
          marginTop: '10px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLevelTwoClick()}
        >
          Show Character Frequency Count
        </Button>
      </div>
    </div>
  );
}

export default App;
