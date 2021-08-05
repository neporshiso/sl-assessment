import { DataGrid } from '@material-ui/data-grid';

const levelTwoColumns = [
  {
    field: 'char',
    headerName: 'Character',
    width: 150,
    editable: false,
  },
  {
    field: 'count',
    headerName: 'Count',
    width: 150,
    editable: false,
  },
];

export const TableTwo = ({
  isLoading,
  columns = levelTwoColumns,
  rows,
  pageSize,
}) => {
  return (
    <div style={{ height: 600, maxWidth: '400px', width: '100%' }}>
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        sortModel={[
          {
            field: 'count',
            sort: 'desc',
          },
        ]}
      />
    </div>
  );
};
