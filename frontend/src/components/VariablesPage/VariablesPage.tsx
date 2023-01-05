import * as React from 'react';
import styled from '@emotion/styled';
import { AppTable, Column } from '../AppTable';

const Container = styled.div`
    padding: 1rem;
    margin: 1rem;
`;

export default function VariablesPage() {
  const columns: Column[] = [
      { id: 'id', label: 'ID', minWidth: 170,
        custom: (value: any) => <a href={`/variables/${value}`}>{value}</a>
      },
      { id: 'name', label: 'Name', minWidth: 100 },
      { id: 'description', label: 'Description', minWidth: 170 },
      { id: 'type', label: 'Type', minWidth: 170 },
    ];
  return (
    <Container>
      <AppTable
        title="Variables"
        columns={columns}
        query="variables"
        addPath="/variables/add"
      />
    </Container>
  );
}
