
import { Box, Button, Typography, Paper } from '@mui/material';

function Artists() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography
          variant="h4"
          color="text.primary"
        >
          Welcome to Pulse
        </Typography>

        <Typography color="text.secondary">
          Listen to your favorite music
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Start Listening
        </Button>
      </Paper>
    </Box>
  );
}

export default Artists;
