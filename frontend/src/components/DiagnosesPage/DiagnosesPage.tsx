import * as React from 'react';
import styled from '@emotion/styled';
import { AppTable, Column } from '../AppTable';

const Container = styled.div`
    padding: 1rem;
    margin: 1rem;
`;

export default function DiagnosesPage() {
  const columns: Column[] = [
      { id: 'id', label: 'ID', minWidth: 170,
          custom: (value: any) => <a href={`/diagnoses/${value}`}>{value}</a>
      },
      { id: 'name', label: 'Name', minWidth: 100 },
      { id: 'description', label: 'Description', minWidth: 170 },
      { id: 'recommended_treatment', label: 'Recommended Treatment', minWidth: 170 },
    ];
    return (
    <Container>
      <AppTable
        title="Diagnoses"
        columns={columns}
        query="diagnoses"
        addPath="/diagnoses/add"
      />
    </Container>
  );
}
