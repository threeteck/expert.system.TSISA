import * as React from 'react';
import {
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from '@emotion/styled';
import { useConnection } from '../../client';
import { ViewPageBase } from '../ViewPageBase';

interface Rule {
    id: number;
    name: string;
    description: string;
    explanation: string;
    condition: string;
    diagnosis_name: string;
}

const Wrapper = styled.div`
  padding: 2rem;
`;

export default function RuleViewPage() {
  const { id } = useParams();
  const connection = useConnection();
  const { data: rule } = useQuery<Rule, Error>(`rule_view_rule`, () =>
    fetch(`${connection}/rules/${id}`).then(res => res.json()));

  if (!rule) {
    return (<div>Loading...</div>);
  }

  return (
    <ViewPageBase title={`Rule №${id}`}
                 backPath={'/rules'}
    >
      <Wrapper>
        <Grid container direction="row">
          <Grid item>
            <Typography style={{ color: "#000000", fontSize: "30px", fontWeight: "bold" }}>
              Rule name
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              style={{ color: "#495561", fontSize: "30px", marginLeft: "48px" }}
            >
                {rule.name}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        <Grid container direction="column">
          <Grid item>
            <Typography align="left"
                        style={{ color: "#000000", fontSize: "22px", fontWeight: "bold"  }}>
              Description
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              align="left"
              style={{ color: "#495561", fontSize: "22px", marginLeft: "24px" }}
            >
                {rule.description}
            </Typography>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        <Grid container direction="column">
            <Grid item>
                <Typography align="left"
                            style={{ color: "#000000", fontSize: "22px", fontWeight: "bold"  }}>
                    Explanation
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    align="left"
                    style={{ color: "#495561", fontSize: "22px", marginLeft: "24px" }}
                >
                    {rule.explanation}
                </Typography>
            </Grid>
        </Grid>

        <Divider style={{ marginTop: "24px", marginBottom: "24px" }} />

        <Grid container direction="column">
            <Grid item>
                <Typography align="left"
                            style={{ color: "#000000", fontSize: "22px", fontWeight: "bold"  }}>
                    Condition
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    align="left"
                    style={{ color: "#495561", fontSize: "22px", marginLeft: "24px" }}
                >
                    {rule.condition}
                </Typography>
            </Grid>
        </Grid>
      </Wrapper>
    </ViewPageBase>
  );
}
