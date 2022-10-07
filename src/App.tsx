import React, { useState } from 'react';
import { Container, TextField, Typography, Grid } from '@mui/material';
import SplittingCard from './SplittingCard';

function App() {

  const [total, setTotal] = useState<number>(0);

  const [payer, setPayer] = useState<number[]>([]);
  const [other, setOther] = useState<number[]>([]);

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

  const calculatePart = () => {

    console.log(`total: ${total}`)

    const payerPart = payer.reduce((prev, curr) => prev + curr, 0);
    const otherPart = other.reduce((prev, curr) => prev + curr, 0);

    console.log(`sum payer ${payerPart}`)
    console.log(`sum other ${otherPart}`)

    const shared = (total - payerPart - otherPart) / 2;
    console.log(`shared half ${shared}`);

    const payerTotal = Math.round((shared + payerPart) * 100) / 100;
    const otherTotal = Math.round((shared + otherPart) * 100) / 100;
    return [payerTotal, otherTotal];
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
            <Typography variant='body1'>Total payer: {calculatePart()[0]}€</Typography>
            <Typography variant='body1'>Total other: {calculatePart()[1]}€</Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
