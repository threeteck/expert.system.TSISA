import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Box,
  Button,
  Container,
  Paper,
  Table, TableBody,
  TableCell, tableCellClasses,
  TableContainer,
  TableHead, TableRow,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useConnection } from '../../client';

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => string;
  custom?: (value: any) => JSX.Element;
}

export interface AppTableProps {
  title: string;
  columns: Column[];
  query: string;
  addPath: string;
}

const Wrapper = styled.div`
  padding: 1rem;
`;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#009be5',
    color: 'white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// Shared component for displaying data in a table and adding new data
export function AppTable({ title, columns, query, addPath }: AppTableProps) {
  const navigate = useNavigate();
  const connection = useConnection();
  const { isLoading, error, data } = useQuery<any, Error>(query, () =>
    fetch(`${connection}/${query}`).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Wrapper>
      <Container maxWidth={false}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate(addPath)}
          >
            Add
          </Button>
        </Box>
      </Container>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px', minHeight: '780px' }} elevation={3}>
        <TableContainer sx={{ maxHeight: 780 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: Record<string, any>) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.custom ? column.custom(value) :
                            column.format ? column.format(value) :
                            typeof value === 'string' && value.length > 50 ? `${value.substring(0, 50)}...`
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );})}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Wrapper>
  )
}
