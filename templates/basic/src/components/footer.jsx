import { Container, Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Container className="footer">
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5">Project Seeder</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            {`${new Date().getFullYear()} | Vite | Zustand | MUI`}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
