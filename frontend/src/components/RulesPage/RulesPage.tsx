import * as React from 'react';
import styled from '@emotion/styled';
import { AppTable, Column } from '../AppTable';

const Container = styled.div`
    padding: 1rem;
    margin: 1rem;
`;

export default function RulesPage() {
  const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 170,
        custom: (value: any) => <a href={`/rules/${value}`}>{value}</a>
    },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'explanation', label: 'Explanation', minWidth: 170 },
    { id: 'condition', label: 'Condition', minWidth: 170 },
    { id: 'diagnosis_name', label: 'Diagnosis', minWidth: 170 },
  ]
  return (
    <Container>
      <AppTable
        title="Rules"
        columns={columns}
        query="rules"
        addPath="/rules/add"
      />
    </Container>
  );
}
