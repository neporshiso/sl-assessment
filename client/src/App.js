import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

import './App.css';

function App() {
  const [peopleData, setPeopleData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        //TODO: could we map over this and grab the data points we actually need??
        //TODO: Add loading animation
        const { data } = await axios.get('http://localhost:3001/api/people');
        console.log('>>>>', data);
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

  const columns = [
    {
      field: 'first_name',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'email_address',
      headerName: 'Email Address',
      width: 300,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Job Title',
      width: 300,
      editable: false,
    },
  ];

  if (isLoading) {
    return <h1>Please wait...</h1>;
  }
  //  Display each Person’s name, email address, and job title.

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <div style={{ height: 600, minWidth: '900px' }}>
        <DataGrid columns={columns} rows={peopleData} pageSize={25} />
      </div>
    </div>
  );
}

export default App;
