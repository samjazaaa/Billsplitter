import React, { useState } from "react";
import { Container, TextField, Typography, Grid } from "@mui/material";
import SplittingCard from "./SplittingCard";

function App() {
  const [total, setTotal] = useState<number>(0);

  const [payer, setPayer] = useState<number[]>([]);
  const [other, setOther] = useState<number[]>([]);

  const handleChangeTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input === "") {
      setTotal(0);
      return;
    }

    const val: number = parseFloat(input.replace(/,/, "."));
    console.log(`parsed ${val}`);
    if (isNaN(val)) {
      setTotal(0);
    } else {
      setTotal(val);
    }
  };

  const calculatePart = () => {
    const payerPart = payer.reduce((prev, curr) => prev + curr, 0);
    const otherPart = other.reduce((prev, curr) => prev + curr, 0);

    const shared = (total - payerPart - otherPart) / 2;

    const payerTotal = Math.round((shared + payerPart) * 100) / 100;
    const otherTotal = Math.round((shared + otherPart) * 100) / 100;
    return [payerTotal, otherTotal];
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom>
        Bill Splitter
      </Typography>
      <form noValidate autoComplete="off">
        <Grid container direction="column" alignItems="center" spacing={10}>
          <Grid item>
            <TextField
              required
              id="total"
              label="Total Sum"
              defaultValue={total}
              onChange={handleChangeTotal}
            />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={4}
          >
            <Grid item>
              <SplittingCard name="Payer" values={payer} setValues={setPayer} />
            </Grid>
            <Grid item>
              <SplittingCard name="Other" values={other} setValues={setOther} />
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Total payer: {calculatePart()[0].toLocaleString("de-DE")}€
            </Typography>
            <Typography variant="body1">
              Total other: {calculatePart()[1].toLocaleString("de-DE")}€
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
