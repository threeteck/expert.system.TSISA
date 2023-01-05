import * as React from 'react';
import {
  Autocomplete,
  Box, Button, Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  TextField, Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { AddPageBase } from '../AddPageBase';
import { useConnection } from '../../client';

interface VariableDefinition {
    id: string;
    name: string;
    description: string;
    type: string;
    options: string[];
    is_multiple: boolean;
}

interface VariableValue {
    variable_definition_id: string;
    variable_definition_name: string;
    variable_definition_options: string[];
    type: string;
    value: string;
    is_multi: boolean;
}

export default function EntryAddPage() {
  const navigate = useNavigate();
  const connection = useConnection();
  const { data: variables } = useQuery<VariableDefinition[], Error>(`entry_add_variables`, () =>
    fetch(`${connection}/variables`).then(res => res.json()));

  const [name, setName] = React.useState('');
  const [currentVariable, setCurrentVariable] = React.useState<VariableDefinition | null>(null);
  const [variableValues, setVariableValues] = React.useState<VariableValue[]>([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const onAddVariable = () => {
    if (currentVariable) {
      setVariableValues([...variableValues, {
        variable_definition_id: currentVariable.id,
        variable_definition_name: currentVariable.name,
        variable_definition_options: currentVariable.options,
        type: currentVariable.type,
        is_multi: currentVariable.is_multiple,
        value: '' }
      ]);
      setCurrentVariable(null);
    }
  }

  const onCreate = () => {
    fetch(`${connection}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            patient_name: name,
        }),
    }).then(async (entry_data) => {
      const entry = await entry_data.json();
      const variableValuesList = variableValues.map((variableValue) => {
        return {
          variable_definition_id: variableValue.variable_definition_id,
          value: variableValue.value,
        };
      });
      fetch(`${connection}/entries/${entry.id}/variable_values`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(variableValuesList),
      }).then(() => {
        navigate(`/entries/${entry.id}`);
      });
    });
  }

  return (
    <AddPageBase title={'Create a new entry for patient'}
                 backPath={'/entries'}
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
                    label="Patient Name"
                    value={name}
                    onChange={handleNameChange}
                />
            </FormControl>

            {variables && (
            // Select and button to add a variable in one row
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <FormControl fullWidth margin="normal">
                    <Autocomplete
                        id="variable"
                        options={variables.filter(variable => !variableValues
                          .find(variableValue => variableValue.variable_definition_id === variable.id))}
                        value={currentVariable}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Variable" />}
                        onChange={(event, value) => {
                          setCurrentVariable(value)
                        }
                    }
                    />
                </FormControl>
                <Button variant="contained" sx={{ marginLeft: '1rem' }} onClick={onAddVariable}>Add</Button>
            </Box>
            )}
            {variableValues.map((variableValue) => {
              let control = null;
              if (variableValue.type === 'number') {
                control = <TextField
                  required
                  id={variableValue.variable_definition_id}
                  label={variableValue.variable_definition_name}
                  value={variableValue.value}
                  onChange={(event) =>
                    setVariableValues(variableValues.map((v) =>
                      v.variable_definition_id === variableValue.variable_definition_id ?
                        { ...v, value: event.target.value } : v))}
                />
              }
              if (variableValue.type === 'boolean') {
                  control = <FormControlLabel
                    control={<Checkbox checked={variableValue.value === 'true'}
                             onChange={(event) =>
                              setVariableValues(variableValues.map((v) =>
                                v.variable_definition_id === variableValue.variable_definition_id ?
                                  { ...v, value: event.target.checked ? 'true' : 'false' } : v))} />}
                            label={variableValue.variable_definition_name} />
              }
              if (variableValue.type === 'option') {
                let val = variableValue.value.split(',');
                if(val.length === 1 && val[0] === '') {
                    val = [];
                }
                control = <Autocomplete
                  id={variableValue.variable_definition_id}
                  value={val}
                  options={variableValue.variable_definition_options}
                  renderInput={(params) => <TextField {...params} label={variableValue.variable_definition_name} />}
                  multiple={variableValue.is_multi}
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
                  onChange={(event, value) =>
                    setVariableValues(variableValues.map((v) =>
                      v.variable_definition_id === variableValue.variable_definition_id ?
                        { ...v, value: (typeof value === 'string' ? [value] : (value ?? [])).join(',') } : v))}
                />
              }

              return (
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%',
                  justifyContent: 'flex-start', alignItems: 'center', marginTop: '1rem' }}
                     key={variableValue.variable_definition_id}>
                  <Typography variant="h6" component="div" sx={{ flexShrink: 0 }}>
                    {variableValue.variable_definition_name}
                  </Typography>
                  <div style={{ marginLeft: '1rem' }}>
                    {control}
                  </div>
                </Box>
              );
            }
        )}
        </Box>
    </AddPageBase>
  );
}
