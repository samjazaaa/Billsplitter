import React, { useState } from 'react';
import { Container, TextField, Typography, Grid } from '@mui/material';
import SplittingCard from './SplittingCard';

function App() {

  const [total, setTotal] = useState(0);

  const [payer, setPayer] = useState([0.34, 1.69, 2.42, 3.37, 4.00]);
  const [other, setOther] = useState([0.34, 1.69, 2.42, 3.37, 4.00]);

  const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {

    const input = event.target.value;
    if (input === '') {
      setTotal(0);
      return
    }

    const val: number = parseFloat(input.replace(/,/, '.'));
    setTotal(val);
    const newInputVal = val.toLocaleString('de-DE')
    if (input.endsWith(',') || input.endsWith('.')) {
      event.target.value = newInputVal + ',';
    } else {
      event.target.value = newInputVal;
    }
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align='center' gutterBottom>Bill Splitter</Typography>
      <form noValidate autoComplete='off'>
        <Grid container direction='column' alignItems='center' spacing={10}>
          <Grid item>
            <TextField required id='total' label='Total Sum' defaultValue={total} onChange={handleChangeTotal} />
          </Grid>
          <Grid item container direction='row' justifyContent='space-between' spacing={8}>
            <Grid item>
              <SplittingCard name='Payer' values={payer} setValues={setPayer} />
            </Grid>
            <Grid item >
              <SplittingCard name='Other' values={other} setValues={setOther} />
            </Grid>
          </Grid>
          <Grid item>
            Output
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
