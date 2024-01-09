// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Typography = (theme: Theme) => ({
    MuiTypography: {
      styleOverrides: {
        root: {
          "@media (min-width:400px)": {
            fontSize: "12px",
          },
          "@media (min-width:1024px)": {
            fontSize: "12px",
          },
          "@media (min-width:1200px)": {
            fontSize: "12px",
          },
          "@media (min-width:1400px)": {
            fontSize: "14px",
          },
        },
        gutterBottom: {
          marginBottom: theme.spacing(2),
        },
      },
    },
  })

export default Typography
