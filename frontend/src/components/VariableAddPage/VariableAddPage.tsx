import * as React from 'react';
import {
  Autocomplete,
  Box, Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel, MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddPageBase } from '../AddPageBase';
import { useConnection } from '../../client';

export default function VariableAddPage() {
  const navigate = useNavigate();
  const connection = useConnection();

  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [type, setType] = React.useState('number');
  const [options, setOptions] = React.useState<string[]>([]);
  const [isMulti, setIsMulti] = React.useState(false);

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  }

  const handleOptionsChange = (event: React.SyntheticEvent, value: string[] | string | null) => {
    if (typeof value === 'string') {
      setOptions(value.split(','));
    } else if (value) {
      setOptions(value);
    } else {
      setOptions([]);
    }
  }

  const handleIsMultiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMulti(event.target.checked);
  }

  const onCreate = () => {
    fetch(`${connection}/variables`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id,
            name,
            description,
            type,
            options: options.join(','),
            is_multiple: isMulti,
        }),
    }).then(() => {
      navigate('/variables');
    });
  }

  return (
    <AddPageBase title={'Create a new variable'}
                 backPath={'/variables'}
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
                id="id"
                label="Id"
                value={id}
                onChange={handleIdChange}
              />
            </FormControl>
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
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    required
                    labelId="type-label"
                    id="type"
                    value={type}
                    label="Type"

                    onChange={handleTypeChange}
                >
                    <MenuItem value={'number'}>Number</MenuItem>
                    <MenuItem value={'option'}>Option</MenuItem>
                    <MenuItem value={'boolean'}>Boolean</MenuItem>
                </Select>
            </FormControl>
            {type === 'option' && (
              <Box sx={{ width: '100%', display: 'flex',
                         alignItems: 'center', justifyContent: 'flex-start' }}>
                <FormControl fullWidth margin="normal">
                  <Autocomplete
                    multiple
                    freeSolo
                    fullWidth
                    id="options"
                    value={options}
                    onChange={handleOptionsChange}
                    options={[]}
                    getOptionLabel={(option) => option}
                    renderTags={(tagValue, getTagProps) =>
                      tagValue.map((option, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    style={{ width: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Options" placeholder="Add option" />
                    )}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <FormControlLabel
                      control={
                          <Checkbox checked={isMulti} onChange={handleIsMultiChange} />
                      }
                      label="Allow multiple choice"
                  />
                  </FormControl>
              </Box>
            )}
        </Box>
    </AddPageBase>
  );
}
