import * as React from 'react';
import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AddPageBase } from '../AddPageBase';
import { useConnection } from '../../client';

interface Diagnosis {
    id: number;
    name: string;
}

export default function RuleAddPage() {
  const navigate = useNavigate();
  const connection = useConnection();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [explanation, setExplanation] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [diagnosis, setDiagnosis] = React.useState<Diagnosis | null>(null);

  const { data: diagnoses } = useQuery<Diagnosis[], Error>(`rules_diagnoses`, () =>
    fetch(`${connection}/diagnoses`).then(res => res.json()));

  if (!diagnoses) {
    return (<div>Loading...</div>);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleExplanationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExplanation(event.target.value);
  }

  const handleConditionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCondition(event.target.value);
  }

  const handleDiagnosisChange = (event: React.SyntheticEvent, value: Diagnosis | null) => {
    setDiagnosis(value);
  }

  const onCreate = () => {
    fetch(`${connection}/rules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        explanation,
        condition,
        diagnosis_id: diagnosis?.id,
      }),
    }).then(res => res.json())
      .then(data => {
        navigate(`/rules/${data.id}`);
      })
      .catch(console.error);
  }

  return (
    <AddPageBase title={'Create a new rule'}
                 backPath={'/rules'}
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
                    id="explanation"
                    label="Explanation"
                    value={explanation}
                    multiline
                    minRows={4}
                    onChange={handleExplanationChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    required
                    id="condition"
                    label="Condition"
                    value={condition}
                    multiline
                    minRows={4}
                    onChange={handleConditionChange}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Autocomplete
                    id="diagnosis"
                    options={diagnoses}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Diagnosis" variant="outlined" />}
                    onChange={handleDiagnosisChange}
                />
            </FormControl>
        </Box>
    </AddPageBase>
  );
}
