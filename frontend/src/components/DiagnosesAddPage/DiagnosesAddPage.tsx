import * as React from 'react';
import {
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddPageBase } from '../AddPageBase';
import { useConnection } from '../../client';

export default function DiagnosesAddPage() {
  const navigate = useNavigate();
  const connection = useConnection();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [recommendation, setRecommendation] = React.useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleRecommendationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecommendation(event.target.value);
  }

  const onCreate = () => {
    fetch(`${connection}/diagnoses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            description,
            recommended_treatment: recommendation,
        }),
    }).then(() => {
      navigate('/diagnoses');
    });
  }

  return (
    <AddPageBase title={'Create a new diagnosis'}
                 backPath={'/diagnoses'}
                 onCreate={onCreate}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: '1rem',
            }}
        >
            <FormControl fullWidth margin="normal">
                <TextField
                    required
                    id="name"
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    required
                    id="description"
                    label="Description"
                    value={description}
                    multiline
                    minRows={4}
                    onChange={handleDescriptionChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                required
                id="recommendation"
                label={'Recommended treatment'}
                value={recommendation}
                multiline
                minRows={4}
                onChange={handleRecommendationChange}
              />
            </FormControl>
        </Box>
    </AddPageBase>
  );
}
