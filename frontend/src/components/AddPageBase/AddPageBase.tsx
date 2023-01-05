import * as React from 'react';
import styled from '@emotion/styled';
import { Box, Button, Container, Divider, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const Wrapper = styled.div`
    padding: 2rem;
    margin: 1rem;
`;

const ContentWrapper = styled.div`
    padding: 1rem;
    min-height: 680px;
`;

export interface AddPageBaseProps {
    title: string;
    backPath: string;
    onCreate: () => void;
    children: React.ReactNode;
}

export function AddPageBase({ title, backPath, children, onCreate }: AddPageBaseProps) {
  const navigate = useNavigate();

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
          <Button variant="outlined"
                  color="primary"
                  startIcon={<ArrowBack />}
                  onClick={() => navigate(backPath)}>
            Back
          </Button>
        </Box>
      </Container>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '16px', minHeight: '780px' }} elevation={3}>
        <ContentWrapper>
          {children}
        </ContentWrapper>
        <Divider />
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                padding: '1rem',
            }}
        >
            <Button variant="contained" color="primary" onClick={onCreate}>
                Create
            </Button>
        </Box>
      </Paper>
    </Wrapper>
  );
}
