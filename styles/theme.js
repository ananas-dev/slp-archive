import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#208e2c',
    },
    error: {
      main: "#f44336",
    },
  },
});

export default theme;