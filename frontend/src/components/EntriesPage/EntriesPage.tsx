import * as React from 'react';
import styled from '@emotion/styled';
import { AppTable, Column } from '../AppTable';

const Container = styled.div`
    padding: 1rem;
    margin: 1rem;
`;

export default function EntriesPage() {
  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 170,
      custom: (value: any) => <a href={`/entries/${value}`}>{value}</a>
    },
    { id: 'patient_name', label: 'Patient name', minWidth: 100 },
    {
      id: 'status',
      label: 'Status',
      minWidth: 170,
      align: 'right',
      custom: (value: 'Pending' | 'Processing' | 'Completed') => {
        switch (value) {
          case 'Pending':
            return <span style={{ color: 'orange' }}>{value}</span>;
          case 'Processing':
            return <span style={{ color: 'blue' }}>{value}</span>;
          case 'Completed':
            return <span style={{ color: 'green' }}>{value}</span>;
          default:
            return <span>{value}</span>;
        }
      },
    },
  ];
  return (
    <Container>
      <AppTable
        title="Entries"
        columns={columns}
        query="entries"
        addPath="/entries/add"
      />
    </Container>
  );
}
