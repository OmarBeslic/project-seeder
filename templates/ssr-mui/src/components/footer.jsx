import { Container, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container className="footer">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <span style={{ fontWeight: 300 }}>created with </span>
          <span style={{ fontWeight: 500 }}>project seeder </span>
        </Grid>
      </Grid>
    </Container>
  );
}
