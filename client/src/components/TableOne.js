import { DataGrid } from '@material-ui/data-grid';

const levelOneColumns = [
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

export const TableOne = ({
  isLoading,
  columns = levelOneColumns,
  rows,
  pageSize,
}) => {
  return (
    <div style={{ height: 600, maxWidth: '900px', width: '100%' }}>
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={rows}
        pageSize={pageSize}
      />
    </div>
  );
};
