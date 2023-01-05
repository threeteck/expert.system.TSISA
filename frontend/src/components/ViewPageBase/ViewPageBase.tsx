import * as React from 'react';
import styled from '@emotion/styled';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
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

export interface ViewPageBaseProps {
    title: string;
    backPath: string;
    children: React.ReactNode;
}

export function ViewPageBase({ title, backPath, children }: ViewPageBaseProps) {
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
      </Paper>
    </Wrapper>
  );
}
