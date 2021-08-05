// used in level 1 & 3 tables
export const peopleDataColumns = [
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

export const levelTwoColumns = [
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

export const levelTwoSortModel = [
  {
    field: 'count',
    sort: 'desc',
  },
];
