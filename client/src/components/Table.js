import { DataGrid } from '@material-ui/data-grid';
import { TableWrapper } from './Styled';

export const Table = ({
  isLoading,
  columns,
  rows,
  pageSize,
  maxWidth,
  sortModel,
}) => {
  return (
    <TableWrapper maxWidth={maxWidth}>
      <DataGrid
        loading={isLoading}
        columns={columns}
        rows={rows}
        pageSize={pageSize}
        sortModel={sortModel}
      />
    </TableWrapper>
  );
};
