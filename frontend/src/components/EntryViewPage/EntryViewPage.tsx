import * as React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useConnection } from '../../client';
import { ViewPageBase } from '../ViewPageBase';

interface VariableValue {
  id: number;
  variable_definition_name: string;
  value: string;
}

interface Entry {
  id: number;
  patient_name: string;
}

interface EntryDiagnosis {
    id: number;
    name: string;
    description: string;
    recommended_treatment: string;
    explanation: string;
}

const Wrapper = styled.div`
  padding: 2rem;
`;

const MiniWrapper = styled.div`
    padding: 0 1rem;
`;

function parseExplanation(explanation: string) {
  // Each title is enclosed in double figure brackets
  // Each inline title is enclosed in single figure brackets
  // Each line ends with a colon

  // First, split the explanation into lines
  const lines = explanation.split(':');
  return lines.map((line, index) => {
    const title = line.match(/{{(.*)}}/)
    const inlineTitle = line.match(/{(.*)}(.*)/)

    if (title) {
      return (
          <Grid item key={index}>
            <Typography align="left"
                        style={{
                          color: "#000000", fontSize: "18px",
                          fontWeight: "bold", marginTop: "16px",
                          whiteSpace: "pre-line",
                        }}>
              {title[1]}
            </Typography>
          </Grid>
      )
    }

    if (inlineTitle) {
      return (
        <Grid container direction="row" key={index}>
          <Grid item>
            <Typography align="left"
                        style={{
                          color: "#000000", fontSize: "16px",
                          fontWeight: "bold", marginTop: "16px",
                          marginLeft: "36px", whiteSpace: "pre-line",
                        }}>
              {inlineTitle[1]}
            </Typography>
          </Grid>

          <Grid item>
            <Typography align="left"
                        style={{
                          color: "#495561", fontSize: "16px",
                          marginLeft: "36px", marginTop: "16px",
                          whiteSpace: "pre-line",
                        }}>
              {inlineTitle[2]}
            </Typography>
          </Grid>
        </Grid>
      )
    }

    return (
      <Grid item key={index}>
        <Typography align="left"
                    style={{
                      color: "#495561", fontSize: "16px",
                      marginLeft: "36px", marginTop: "8px",
                      whiteSpace: "pre-line",
                    }}>
          {line}
        </Typography>
      </Grid>
    )
  });
}

export default function EntryViewPage() {
  const { id } = useParams();
  const connection = useConnection();
  const { data: variables } = useQuery<VariableValue[], Error>(`entry_view_variables`, () =>
    fetch(`${connection}/entries/${id}/variable_values`).then(res => res.json()));
  const { data: entry } = useQuery<Entry, Error>(`entry_view_entry`, () =>
    fetch(`${connection}/entries/${id}`).then(res => res.json()));
  const { data: diagnoses } = useQuery<EntryDiagnosis[], Error>(`entry_view_diagnoses`, () =>
    fetch(`${connection}/entries/${id}/entry_diagnoses`).then(res => res.json()));

  if (!variables || !entry) {
    return (<div>Loading...</div>);
  }

  return (
    <ViewPageBase title={`Patient entry №${id}`}
                 backPath={'/entries'}
    >
      <Wrapper>
        <Grid container direction="row">
          <Grid item>
            <Typography style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}>
              Patient name
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              style={{ color: "#495561", fontSize: "30px", marginLeft: "48px" }}
            >
                {entry.patient_name}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        <Grid container direction="row" style={{ marginTop: "24px" }}>
          <Grid item>
            <Typography style={{ color: "#000000", fontSize: "25px", fontWeight: "bold" }}>
              Variables
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        {variables.map((variable) => (
          <Grid key={variable.id} container direction="row" style={{ marginTop: "16px" }}>
            <Grid item>
              <Typography style={{ color: "#000000", fontSize: "22px", fontWeight: "bold" }}>
                {variable.variable_definition_name}
              </Typography>
            </Grid>

            <Grid item>
              <Typography
                style={{ color: "#495561", fontSize: "22px", marginLeft: "24px" }}
              >
                {variable.value.split(',').join(', ')}
              </Typography>
            </Grid>
          </Grid>
        ))}

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        <Grid container direction="row" style={{ marginTop: "24px", marginBottom: "0" }}>
            <Grid item>
                <Typography style={{ color: "#000000", fontSize: "25px", fontWeight: "bold" }}>
                    Possible diagnoses
                </Typography>
            </Grid>
        </Grid>

      </Wrapper>

        {diagnoses ? diagnoses.map((diagnosis, i) => (
          <Accordion key={diagnosis.id} style={{ marginTop: (i === 0 ? "0" : "16px"), padding: "0 16px" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography style={{ color: "#000000", fontSize: "22px", fontWeight: "bold" }}>
                    {diagnosis.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column">
                    <Grid item>
                        <Typography align="left"
                                    style={{ color: "#000000", fontSize: "22px", fontWeight: "bold",
                                      whiteSpace: "pre-line",  }}>
                            Description
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            align="left"
                            style={{ color: "#495561", fontSize: "20px", marginLeft: "24px",
                              whiteSpace: "pre-line", }}
                        >
                            {diagnosis.description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="left"
                                    style={{ color: "#000000", fontSize: "22px",
                                      fontWeight: "bold", marginTop: "12px" }}>
                            Recommended treatment
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            align="left"
                            style={{ color: "#495561", fontSize: "20px", marginLeft: "24px",
                              whiteSpace: "pre-line", }}
                        >
                            {diagnosis.recommended_treatment}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography align="left"
                                    style={{ color: "#000000", fontSize: "22px",
                                      fontWeight: "bold", marginTop: "12px" }}>
                            Explanation
                        </Typography>
                    </Grid>
                    <MiniWrapper>
                      {parseExplanation(diagnosis.explanation)}
                    </MiniWrapper>
                </Grid>
            </AccordionDetails>
            </Accordion>
        )) : null}

    </ViewPageBase>
  );
}
