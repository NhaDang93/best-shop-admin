// ** MUI Imports
import { Theme } from '@mui/material/styles'

const Chip = (theme: Theme) => ({
    MuiChip: {
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
        outlined: {
          '&.MuiChip-colorDefault': {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`,
          },
        },
        deleteIcon: {
          width: 18,
          height: 18,
        },
      },
    },
  })

export default Chip
